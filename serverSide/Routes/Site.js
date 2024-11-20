import express from 'express';
import {
  AddSite,
  DeleteSite,
  GetSites,
  acceptRequest,
  checkSites,
  deleteMember,
  getSite,
  getSiteId,
  getSites,
  getUserSites,
  inviteMember,
  lastSiteCreated,
  listedMembers,
  searchSite,
  sendInvite,
  updateRoleUser,
  updateSiteUrl,
  verifyTracking,
} from '../Controllers/Site.js';

const router = express.Router();

router.post('/AddSite', AddSite);
router.get('/GetAllSite', GetSites);
router.get('/GetUserSites/:id', getUserSites);
router.post('/updateSiteUrl', updateSiteUrl);
router.delete('/deleteSite/:id', DeleteSite);
router.get('/checkSites/:userId', checkSites);
router.get('/lastSite/:userId', lastSiteCreated);
router.get('/getSiteId/:siteId/:id', getSiteId);
router.post('/searchSite/:id', searchSite);
router.post('/verifyTracking', verifyTracking);
router.post('/invite/:id/:userId', inviteMember);
router.get('/listedMembers/:id', listedMembers);
router.post('/updateRole/:id/:userId/:memberId', updateRoleUser);
router.get('/deleteMember/:siteId/:userId/:memberId', deleteMember);
router.post('/getSites/:id', getSites);
router.post('/sendInvite/:siteId/:id/:userId', sendInvite);
router.get('/accept-request/:siteId/:senderUserId', acceptRequest);
router.get('/getSite/:siteId', getSite);

export default router;
