import Site from '../Modules/Site.js';
import Users from '../Modules/Users.js';
import puppeteer from 'puppeteer';
import nodemailer from 'nodemailer';

const generateTrackingCode = (siteId) => {
  return `
      <script>
        (function() {
            const siteId = '${siteId}';
            const script = document.createElement('script');
            script.src = "${process.env.backendUrl}/js/survey-loader.js?siteId=" + siteId;
            document.head.appendChild(script);
        })();
      </script>`;
};

export const verifyTracking = async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForFunction(() => document.head !== null);

    const isTrackingScriptPresent = await page.evaluate((trackingCode) => {
      const scripts = Array.from(document.querySelectorAll('script'));
      return scripts.some((script) => script.src.includes(trackingCode));
    }, 'survey-loader.js');

    await browser.close();

    if (isTrackingScriptPresent) {
      return res.status(200).json({ message: 'Tracking script found!' });
    } else {
      return res
        .status(404)
        .json({ message: 'Tracking script not found on the website.' });
    }
  } catch (error) {
    console.error('Puppeteer error:', error.stack);
    return res
      .status(500)
      .json({ message: 'Error verifying installation', error: error.message });
  }
};
export const AddSite = async (req, res) => {
  try {
    const { organisation, name, url, userId } = req.body;

    const user = await Users.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ status: 'failure', message: 'User not found' });
    }
    const existingSite = await Site.findOne({
      $or: [{ url }, { name }],
    });

    if (existingSite) {
      return res.status(400).json({
        status: 'failure',
        message: 'A site with the same URL or name already exists',
      });
    }

    const newSite = new Site({
      organisation,
      name,
      url,
      user: userId,
    });
    newSite.trackingCode = generateTrackingCode(newSite._id);

    const savedSite = await newSite.save();

    user.sites.push(savedSite._id);
    await user.save();

    res.status(201).json({ status: 'success', site: savedSite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const GetSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteSite = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSite = await Site.findByIdAndDelete(id);

    if (!deletedSite) {
      return res.status(404).json({ message: 'Site not found' });
    }

    res.status(200).json({ message: 'Site deleted successfully' });
  } catch (error) {
    console.error('Error deleting site:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const checkSites = async (req, res) => {
  try {
    const { userId } = req.params;

    const sites = await Site.find({
      $or: [{ user: userId }, { 'members.user': userId }],
    });

    res.json({ hasSites: sites.length > 0 });
  } catch (err) {
    console.error('Error checking sites:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const lastSiteCreated = async (req, res) => {
  const { userId } = req.params;

  try {
    let site = await Site.findOne({ user: userId }).sort({ createdAt: -1 });

    if (!site) {
      site = await Site.findOne({ 'members.user': userId }).sort({
        createdAt: -1,
      });
    }

    if (site) {
      res.json({ siteId: site._id });
    } else {
      res.status(404).json({ message: 'No sites found for this user.' });
    }
  } catch (err) {
    console.error('Error fetching last site:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getUserSites = async (req, res) => {
  try {
    const userId = req.params.id;

    const createdSites = await Site.find({ user: userId })
      .populate('user')
      .populate('members.user')
      .populate('surveys');

    const memberSites = await Site.find({
      'members.user': userId,
      user: { $ne: userId },
    })
      .populate('user')
      .populate('members.user')
      .populate('surveys');

    if (!createdSites.length && !memberSites.length) {
      return res
        .status(404)
        .json({ status: 'failure', message: 'No sites found' });
    }

    res.status(200).json({
      status: 'success',
      sites: {
        createdSites,
        memberSites,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const getSiteId = async (req, res) => {
  try {
    const { siteId, id } = req.params;
    const site = await Site.findById(siteId);
    const user = await Users.findById(id);

    if (!site) {
      return res.status(404).send('Site not found');
    }
    if (!user) {
      return res.status(404).json('user not found');
    }

    if (
      site.user.toString() !== id &&
      !site.members.some(
        (member) =>
          member.user.toString() === id &&
          (member.role === 'read_write' || member.role === 'read')
      )
    ) {
      return res
        .status(403)
        .send(
          'Access denied. You are not the creator or a member of this site.'
        );
    }

    res.json(site);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const getSite = async (req, res) => {
  try {
    const { siteId } = req.params;
    const site = await Site.findById(siteId);

    if (!site) {
      return res.status(404).send('Site not found');
    }

    res.json(site);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const searchSite = async (req, res) => {
  try {
    const { url } = req.body;
    const { id } = req.params;

    const createdSites = await Site.find({
      user: id,
      url: { $regex: url, $options: 'i' },
    });

    const memberSites = await Site.find({
      'members.user': id,
      url: { $regex: url, $options: 'i' },
    });

    if (!createdSites.length && !memberSites.length) {
      return res.status(404).send('Site not found');
    }

    res.json({
      createdSites,
      memberSites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

export const updateSiteUrl = async (req, res) => {
  try {
    const { siteId, newUrl } = req.body;

    const updatedSite = await Site.findByIdAndUpdate(
      siteId,
      { url: newUrl },
      { new: true }
    );

    if (!updatedSite) {
      return res
        .status(404)
        .json({ status: 'failure', message: 'Site not found' });
    }

    res.status(200).json({ status: 'success', site: updatedSite });
  } catch (error) {
    console.error('Error updating site name:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const inviteMember = async (req, res) => {
  const { id, userId } = req.params;
  const { email, role } = req.body;

  if (!['read', 'read_write'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const site = await Site.findById(id).populate('user');
    const user = await Users.findById(userId);

    if (!site || !user) {
      return res.status(404).json({ message: 'Site or User not found' });
    }

    if (!site.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: 'Not authorized to invite users' });
    }

    const invitedUser = await Users.findOne({ email });
    if (!invitedUser) {
      return res.status(404).json({ message: 'Invited user not found' });
    }

    const existingMember = site.members.find(
      (member) => member.user.toString() === invitedUser._id.toString()
    );

    if (existingMember) {
      if (existingMember.role === role) {
        return res
          .status(404)
          .json({ message: 'User is already a member with the same role' });
      }

      existingMember.role = role;
      await site.save();

      return res
        .status(201)
        .json({ message: 'User role updated successfully' });
    } else {
      site.members.push({ user: invitedUser._id, role });
      await site.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'soukainaouchenuai@gmail.com',
          pass: 'ktteypikemdcbkqq',
        },
      });

      const linkUrl = `http://localhost:3000/site/${id}/surveys`;

      await transporter.sendMail({
        from: 'soukainaouchenuai@gmail.com',
        to: email,
        subject: `You now have access to ${site.organisation} - ${site.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h2 style="color: #2c7be5;">You have been invited to the site: ${site.name}!</h2>
            <p>Hi,</p>
            <p>You now have access to the site <strong>${site.name}</strong> within the ${site.organisation} organization on the Survey platform.</p>
            <p style="color: #666;">To access the site, please click the button below:</p>
            <a 
              href="${linkUrl}" 
              style="display: inline-block; padding: 10px 20px; color: white; background-color: #2c7be5; border-radius: 5px; text-decoration: none; font-weight: bold;"
            >
              Take me there
            </a>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p style="margin-top: 20px;">Best regards,</p>
            <p><strong>${site.organisation} Team</strong></p>
          </div>
        `,
      });

      return res.status(200).json({ message: 'Invitation sent successfully' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Server error', details: err.message });
  }
};

export const updateRoleUser = async (req, res) => {
  const { id, userId, memberId } = req.params;

  const { newRole } = req.body;
  if (!['read', 'read_write'].includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }
  try {
    const site = await Site.findById(id);
    if (!site) {
      return res.status(400).json({ message: 'Site not found' });
    }

    if (!site.user.equals(userId)) {
      return res
        .status(403)
        .json({ message: 'Not authorized to change the role to anyone' });
    }
    const member = site.members.find(
      (member) => member.user.toString() === memberId.toString()
    );
    if (!member) {
      return res.status(400).json({ message: 'Member not found in the site' });
    }
    member.role = newRole;
    await site.save();
    return res.status(200).json(site);
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Server error', details: err.message });
  }
};

export const listedMembers = async (req, res) => {
  const { id } = req.params;

  try {
    const siteResult = await Site.findById(id).populate('user').populate({
      path: 'members.user',
      select: 'username email',
    });

    if (!siteResult) {
      return res.status(404).json({ error: 'Site not found' });
    }

    return res.status(200).json({
      creator: siteResult.user,
      members: siteResult.members,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const deleteMember = async (req, res) => {
  const { siteId, userId, memberId } = req.params;

  if (!siteId || !userId || !memberId) {
    return res
      .status(400)
      .json({ message: 'siteId & userId & memberId are required' });
  }
  try {
    const site = await Site.findById(siteId);
    if (!site) {
      return res.status(400).json({ message: 'Site not found' });
    }
    if (!site.user.equals(userId)) {
      return res
        .status(400)
        .json('Not authorised to delete a member of this site');
    }

    site.members = site.members.filter(
      (member) => member.user.toString() !== memberId.toString()
    );
    await site.save();
    return res.status(200).json({ message: 'Delete the member succefully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getSites = async (req, res) => {
  const { id } = req.params;
  try {
    const sites = await Site.find().populate('user', 'username');

    const siteFilter = sites.filter(
      (site) => site.user && site.user._id.toString() !== id
    );
    const siteData = siteFilter.map((site) => ({
      id: site._id,
      url: site.url,
      name: site.name,
      created: site.user,
    }));

    res.status(200).json(siteData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const { siteId, senderUserId } = req.params;

    const site = await Site.findById(siteId);
    const senderUser = await Users.findById(senderUserId);
    if (!site || !senderUser) {
      return res.status(404).json({ message: 'Site or senderUser not found' });
    }
    const existingMember = site.members.find(
      (member) => member._id === senderUserId
    );
    if (existingMember) {
      return res
        .status(400)
        .json({ message: 'User is already a member of this site' });
    }

    site.members.push({ user: senderUser, role: 'read' });
    await site.save();

    return res
      .status(200)
      .json({ message: 'User added as a member successfully!' });
  } catch (err) {
    console.error('Error accepting request:', err);
    return res
      .status(500)
      .json({ message: 'Failed to accept request', error: err.message });
  }
};

export const sendInvite = async (req, res) => {
  try {
    const { siteId, id: senderUserId, userId: recipientUserId } = req.params;
    if (!siteId || !senderUserId || !recipientUserId) {
      return res.status(400).json({
        message: 'siteId, senderUserId, and recipientUserId are required',
      });
    }

    const userSender = await Users.findById(senderUserId);
    const userRecipient = await Users.findById(recipientUserId);
    const site = await Site.findById(siteId);

    if (!userSender || !userRecipient) {
      return res.status(404).json({ message: 'One of the users not found' });
    }
    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }
    const isAlreadyMember = site.members.some((member) =>
      member.user.equals(userSender._id)
    );

    if (isAlreadyMember) {
      return res
        .status(400)
        .json({ message: `You are already a member of ${site.name}` });
    }
    const acceptRequestUrl = `${process.env.REACT_APP_BACKEND_URL}/site/accept-request/${siteId}/${senderUserId}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'soukainaouchenuai@gmail.com',
        pass: 'ktteypikemdcbkqq',
      },
    });

    await transporter.sendMail({
      from: 'soukainaouchenuai@gmail.com',
      to: userRecipient.email,
      subject: `${userSender.username} has requested to join ${site.organisation} - ${site.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2 style="color: #2c7be5;">Membership Request for Site</h2>
          <p>Hi ${userRecipient.username},</p>
          <p>${userSender.username} has requested to join the site <strong>${site.name}</strong> within the <strong>${site.organisation}</strong> organization on the Survey platform.</p>
          <a  href="${acceptRequestUrl}"
 
            style="display: inline-block; padding: 10px 20px; cursor : pointer; color: white; background-color: #2c7be5; border-radius: 5px; text-decoration: none; font-weight: bold;"
          >
            Accept Request
          </a>
          <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>${site.organisation} Team</strong></p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Invite sent successfully!' });
  } catch (err) {
    console.error('Error sending invite:', err);
    return res
      .status(500)
      .json({ message: 'Failed to send invite', error: err.message });
  }
};
