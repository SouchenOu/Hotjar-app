import Surveys from '../Modules/Surveys.js';
import Users from '../Modules/Users.js';
import mongoose from 'mongoose';
import ComponentSchema from '../Modules/Component.js';
import Site from '../Modules/Site.js';
import Response from '../Modules/Response.js';
import { generateComponent } from './GlobalComponents.js';

const Component = mongoose.model('Component', ComponentSchema);

export const createSurveys = async (req, res) => {
  //a new session is initiated allowing multiple operation to be treated as a single transaction. this means that if any part of the operation fails, all changes can be annuler.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { siteId } = req.params;
    const {
      name,
      description,
      components,
      target,
      createdUser,
      status,
      backgroundColor,
      buttonColor,
      textColor,
      language,
      logo,
      templateId,
      targetUrl,
      timing,
      delayTime,
      frequency,
    } = req.body;

    const user = await Users.findById(createdUser).session(session);

    if (!user) {
      // aborts the transaction and returns a 404 error response.
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: 'User not found' });
    }
    const site = await Site.findById(siteId).session(session);

    if (!site) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        error: 'No sites found. Please add a site first.',
        redirectTo: '/add-site',
      });
    }

    const isOwner = site.user.equals(createdUser);
    const hasWriteAccess = site.members.some(
      (member) =>
        member.user.equals(createdUser) && member.role === 'read_write'
    );

    if (!isOwner && !hasWriteAccess) {
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({
        error: 'You do not have permission to create a survey in this site.',
      });
    }

    const survey = new Surveys({
      name,
      description,
      components: [],
      target,
      createdUser,
      status,
      backgroundColor,
      buttonColor,
      textColor,
      language,
      logo,
      timing,
      frequency,
      site: site._id,
      templateId,
      targetUrl,
      delayTime,
    });
    const surveySave = await survey.save({ session });

    const componentDocs = [];
    for (let comp of components) {
      comp.surveyId = surveySave._id;

      if (!comp.type || !comp.question) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error: 'Component type and question are required',
          component: comp,
        });
      }

      const componentDoc = new Component(comp);

      const savedComponent = await componentDoc.save({ session });
      componentDocs.push(savedComponent);
    }

    surveySave.components = componentDocs;
    await surveySave.save({ session });

    site.surveys.push(surveySave._id);
    await site.save({ session });
    // committing a transaction means that all operations performed during that transaction are finalized and saved permanently in the databas
    await session.commitTransaction();
    session.endSession();
    res.status(201).json(surveySave);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const getAllSurveysBySite = async (req, res) => {
  const { siteId, userId } = req.params;

  try {
    const site = await Site.findById(siteId)
      .populate('user', 'username') // Populate the creator's username
      .populate('members.user', 'username role'); // Populate members with roles

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    let userRole = null;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (site.user._id.equals(userId)) {
      userRole = 'admin';
    } else {
      const member = site.members.find((member) =>
        member.user._id.equals(userId)
      );
      if (member) {
        userRole = member.role;
      }
    }

    if (!userRole) {
      return res
        .status(403)
        .json({ error: 'User does not have access to this site' });
    }

    const surveys = await Surveys.find({ site: siteId })
      .populate('createdUser', 'username')
      .exec();

    const validSurveys = surveys.filter(
      (survey) => survey.createdUser !== null
    );

    res.status(200).json({ surveys: validSurveys, userRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const SearchSurvey = async (req, res) => {
  const { query } = req.query;
  const { id } = req.params;

  if (!query || !id) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  const user = await Users.findById(id);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const surveys = await Surveys.find({
      createdUser: id,
      name: new RegExp(query, 'i'),
    }).populate('createdUser', 'username');

    res.status(200).json(surveys);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const deleteSurvey = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const survey = await Surveys.findById(id).session(session);
    if (!survey) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Survey not found' });
    }

    await Component.deleteMany({ surveyId: id }).session(session);

    // Remove survey reference from the site
    await Site.updateOne(
      { _id: survey.site },
      { $pull: { surveys: id } },
      { session }
    );

    await Surveys.deleteOne({ _id: id }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: 'Survey and associated components deleted successfully',
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const updateSurvey = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const {
      name,
      description,
      components,
      target,
      createdUser,
      status,
      backgroundColor,
      buttonColor,
      textColor,
      language,
      logo,
      targetUrl,
      timing,
      delayTime,
      frequency,
    } = req.body;

    const survey = await Surveys.findById(id).session(session);
    if (!survey) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Survey not found' });
    }

    const componentDocs = [];
    if (components) {
      if (components.length !== 4) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(400)
          .json({ message: 'Survey must have exactly 4 components' });
      }

      for (const comp of components) {
        if (!comp._id && (!comp.type || !comp.question)) {
          await session.abortTransaction();
          session.endSession();
          return res
            .status(400)
            .json({ message: 'Each component must have a type and question' });
        }

        let componentDoc;
        if (comp._id) {
          componentDoc = await Component.findOneAndUpdate(
            { _id: comp._id },
            comp,
            { new: true, runValidators: true, session }
          );
          if (!componentDoc) {
            await session.abortTransaction();
            session.endSession();
            return res
              .status(404)
              .json({ message: `Component with ID ${comp._id} not found` });
          }
        } else {
          const error = componentDoc.validateSync();
          if (error) {
            await session.abortTransaction();
            session.endSession();
            return res
              .status(400)
              .json({ error: 'Invalid component data', details: error });
          }
        }
        componentDocs.push(componentDoc);
      }

      survey.components = componentDocs.map((doc) => ({
        _id: doc._id,
        type: doc.type,
        options: doc.options,
        question: doc.question,
        lowScoreTitle: doc.lowScoreTitle,
        highScoreTitle: doc.highScoreTitle,
        image: doc.image,
      }));
    }

    if (name) survey.name = name;
    if (description) survey.description = description;
    if (timing) survey.timing = timing;
    if (frequency) survey.frequency = frequency;
    if (target) survey.target = target;
    if (status) survey.status = status;
    if (backgroundColor) survey.backgroundColor = backgroundColor;
    if (buttonColor) survey.buttonColor = buttonColor;
    if (textColor) survey.textColor = textColor;
    if (language) survey.language = language;
    if (logo) survey.logo = logo;
    if (createdUser) survey.createdUser = createdUser;
    if (targetUrl) survey.targetUrl = targetUrl;
    if (delayTime) survey.delayTime = delayTime;

    const updatedSurvey = await survey.save({ session });

    const responses = await Response.find({ surveyId: id }).session(session);

    // Update questions in responses
    for (const response of responses) {
      response.responses = response.responses.map((Item) => {
        const updatedComponent = components.find(
          (comp) => comp._id.toString() === Item.componentId.toString()
        );
        if (updatedComponent) {
          return { ...Item, question: updatedComponent.question };
        }
        return Item;
      });

      await response.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedSurvey);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const survey = await Surveys.findById(id);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    survey.status = status;
    const updatedSurvey = await survey.save();
    res.json(updatedSurvey);
  } catch (error) {
    console.error('Error updating survey status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getSurveyById = async (req, res) => {
  try {
    const survey = await Surveys.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: 'survey not found' });
    }
    return res.status(200).json(survey);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
export const getSurveyData = async (req, res) => {
  try {
    const site = await Site.findById(req.params.siteId);

    if (!site) {
      return res.status(404).json({ message: 'Site not found' });
    }

    const survey = await Surveys.findOne({
      site: req.params.siteId,
      status: true,
    })
      .sort({ createdAt: -1 })
      .exec();

    if (!survey) {
      return res
        .status(404)
        .json({ message: 'Survey not found for this site' });
    }

    const isArabic = survey.language === 'ar';
    const textDirection = isArabic ? 'rtl' : 'ltr';
    const textAlign = isArabic ? 'right' : 'left';
    let imagePath = '';
    let fullImageURL = '';
    const baseURL = 'https://pro1-ubq1.onrender.com';
    const feedbackComp = survey.components.find(
      (comp) => comp.type === 'designFeedback'
    );
    if (feedbackComp) {
      imagePath = feedbackComp.image ? `${feedbackComp.image}` : '';
      fullImageURL = `${baseURL}${imagePath}`;
    }

    const logoPath = survey.logo ? `${baseURL}${survey.logo}` : '';

    const surveyHtml = `
            <div class="survey" style="font-family: Arial, sans-serif;  direction: ${textDirection}; text-align: ${textAlign};">
                ${survey.components
                  .map((component, index) => {
                    switch (component.type) {
                      case 'checkbox':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'checkbox',
                          fullImageURL,
                          logoPath
                        );
                      case 'radio':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'radio',
                          fullImageURL,
                          logoPath
                        );
                      case 'nps':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'nps',
                          fullImageURL,
                          logoPath
                        );
                      case 'scoreBox':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'score',
                          fullImageURL,
                          logoPath
                        );
                      case 'score':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'score',
                          fullImageURL,
                          logoPath
                        );

                      case 'designFeedback':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'designFeedback',
                          fullImageURL,
                          logoPath
                        );

                      case 'longTextAnswer':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'longTextAnswer',
                          fullImageURL,
                          logoPath
                        );

                      case 'email':
                        return generateComponent(
                          component,
                          index,
                          isArabic,
                          survey,
                          'email',
                          fullImageURL,
                          logoPath
                        );

                      case 'cta':
                        return `
                                <div class="component" style="display: ${index === 0 ? 'block' : 'none'};  position: fixed; z-index: 9999">
                                    <div id="survey-content-container" class="survey-content" style=" background-color: ${survey.backgroundColor};  border: 1px solid #d1d5db; height: auto; border-radius: 0.5rem;">
                                            ${!isArabic ? `${logoPath && `<img src="${logoPath}" alt="Survey Logo" style="width: 30px; height: 30px; margin-left: 110px;">`} ` : ` ${logoPath && `<img src="${logoPath}" alt="Survey Logo" style="width: 30px; height: 30px; margin-right: 120px;">`}`}
                                        <div style="padding-top: 20px; display: flex; flex-wrap: wrap; gap: 20px">

                                            <h2 style="font-size: 17px; color: ${survey.textColor}; ">${component.question}</h2>
                                            ${
                                              isArabic
                                                ? `<button id="close-survey-btn" style="font-size: 15px; width: 60px ; margin-right: 100px; height: 30px; font-weight: bold;  background-color: #007BFF; color: white; border: none; cursor: pointer; background-color: ${survey.buttonColor}">اغلق</button>`
                                                : `<button id="close-survey-btn" style="font-size: 15px; width: 60px ; margin-left: 100px; height: 30px; font-weight: bold;  background-color: #007BFF; color: white; border: none; cursor: pointer; background-color: ${survey.buttonColor}">Close</button>`
                                            }
                                        </div>     
                                    </div>
                                     <div class="additional-content-container"  style="display: none; background-color:${survey.backgroundColor}; border: 1px solid #d1d5db;  height: auto; border-radius: 0.5rem;">
                                        ${
                                          !isArabic
                                            ? ` <i  class="toggle-icon fas fa-caret-up" style="position: absolute; top: 20px; margin-left: 20px; font-size: 25px; width: 30px; height: 30px; cursor: pointer; color: #686868;"></i>
                                                    <h1 class="text-question" style="font-size: 20px; color: #000000; margin-left: 50px">${component.question}</p>`
                                            : `<i  class="toggle-icon fas fa-caret-up" style="position: absolute; top: 20px; margin-right: 20px; font-size: 25px; width: 30px; height: 30px; cursor: pointer; color: #686868;"></i>
                                                <h1 class="text-question" style="font-size: 20px; color: #000000; margin-right: 50px">${component.question}</h1>`
                                        }
                                    </div> 
                                </div>
                            `;
                      default:
                        return '';
                    }
                  })
                  .join('')}
            </div>
            
        `;
    res.json({
      html: surveyHtml,
      survey: {
        targetUrl: survey.targetUrl,
        target: survey.target,
        timing: survey.timing,
        frequency: survey.frequency,
        delayTime: survey.delayTime,
        buttonColor: survey.buttonColor,
        surveyId: survey._id,
        components: survey.components.map((comp) => ({
          id: comp._id,
          ...comp,
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching survey data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }
    //const filePath = `/uploads/${req.file.filename}`;
    const filePath = `https://pro1-ubq1.onrender.com/uploads/${req.file.filename}`;

    res.send({ logoUrl: filePath });
  } catch (error) {
    console.error('Error saving the logo URL', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

