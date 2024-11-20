import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Surveys from './pages/Surveys/Surveys.jsx';
import Overview from './pages/Profile/overview.jsx';
import EditSurvey from './pages/Surveys/EditSurvey.jsx';
import TemplateGallery from './pages/Templates/TemplateGallery.jsx';
import SignUp from './pages/SignUp/SignUp.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import SiteForm from './pages/Site/SiteForm.js';
import SiteTable from './pages/Site/SiteTable.js';
import Response from './pages/Response/Response.jsx';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectRoute.jsx';
import Page from './pages/Surveys/CreateSurvey/Page.jsx';
import ForgotPassword from './pages/SignIn/ForgotPassword.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ChangeEmail from './pages/Profile/ChangeEmail.jsx';
import ChangePassword from './pages/Profile/ChangePassword.js';
import Invite from './pages/Site/Invite.jsx';
import TeamList from './pages/Site/Teamlist.jsx';
import NotAllowed from './pages/Navbar/NotAllowed.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/email/:id"
            element={
              <ProtectedRoute>
                <ChangeEmail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:id/team/invite"
            element={
              <ProtectedRoute>
                <Invite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:id/team/list"
            element={
              <ProtectedRoute>
                <TeamList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password/:id"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/site" element={<SiteForm />} />
          <Route
            path="/sites"
            element={
              <ProtectedRoute>
                <SiteTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/site/:id/surveys"
            element={
              <ProtectedRoute>
                <Surveys />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:id/survey/:surveyId/response"
            element={
              <ProtectedRoute>
                <Response />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:id/permission-required"
            element={
              <ProtectedRoute>
                <NotAllowed />
              </ProtectedRoute>
            }
          />

          <Route
            path="/site/:id/overview"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:id/surveys/edit/:surveyId"
            element={
              <ProtectedRoute>
                <EditSurvey />
              </ProtectedRoute>
            }
          />
          <Route
            path="site/:id/templates"
            element={
              <ProtectedRoute>
                <TemplateGallery />
              </ProtectedRoute>
            }
          />
          <Route
            path="/site/:siteId/survey/create/template/:templateId"
            element={
              <ProtectedRoute>
                <Page />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
