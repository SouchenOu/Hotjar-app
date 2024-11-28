import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from './NavBar';
import {
  faCheck,
  faChevronDown,
  faComment,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { useReducer, useState, React } from 'react';
import { useAuth } from '../../context/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateProvider } from '../../context/StateContext';
import Footer from './Footer';
import reducer, { initialeState } from '../../context/StateReducers';
import Component from '../Components/Component';
import Animated from './Animated';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [{ userInfo }] = useStateProvider();
  const [openFeedback, setFeedback] = useState(false);
  const [openSurvey, setSurvey] = useState(true);
  const [state] = useReducer(reducer, initialeState);
  const [nextQuestion, setNextQuestion] = useState('');

  const handleChoices = (type) => {
    if (type === 'feedback') {
      setFeedback(!openFeedback);
      setSurvey(!openSurvey);
    }
    if (type === 'survey') {
      setSurvey(!openSurvey);
      setFeedback(!openFeedback);
    }
  };

  const handleGetStarted = async () => {
    try {
      const checkRes = await axios.get(
        `https://pro-1-hk8q.onrender.com/site/checkSites/${userInfo._id}`
      );
      const { hasSites } = checkRes.data;
      if (!hasSites) {
        navigate('/site');
      } else {
        const lastSiteRes = await axios.get(
          `https://pro-1-hk8q.onrender.com/site/lastSite/${userInfo._id}`
        );
        const lastSite = lastSiteRes.data;
        navigate(`/site/${lastSite.siteId}/surveys`);
      }
    } catch (error) {
      console.error('Error handling get started:', error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-[170px]">
      <NavBar />
      <div className="flex flex-col  md:flex-row items-center  mr-[20px] mt-[200px] px-8">
        <div className="flex flex-col gap-6 max-w-lg w-full md:max-w-sm lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          <h2 className="text-[15px] text-gray-500">
            YOU'VE BEEN INVITED TO TRY HOTJAR SURVEYS
          </h2>
          <h1 className="2xl:text-5xl md:text-4xl text-xl lg:text-3xl">
            Everything you ever{' '}
            <a href="#about" className="text-orange-700 font-bold">
              wanted to know
            </a>{' '}
            about your website...
          </h1>
          <h2 className="text-lg text-gray-700 md:text-2xl">
            ...but your analytics never told you.
          </h2>
          <p className="text-lg text-gray-500">
            Hotjar shows you the numbers you need—and the real user behavior
            behind them.
          </p>
          <button
            className="text-[17px] font-bold border-2 px-8 py-2 w-full md:w-48 sm:w-[200px] text-orange-700 border-orange-700 hover:bg-orange-700 hover:text-white"
            onClick={handleGetStarted}
          >
            Get started
          </button>
        </div>

        <img
          src="/test.svg"
          alt="Illustration"
          className="w-full md:w-1/2 lg:w-[450px] 2xl:w-[450px] mt-8 md:mt-0 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rotate-2 max-w-full"
        />
      </div>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col gap-[10px] items-center">
          <h1 className="xl:text-3xl md:text-3xl lg:text-3xl font-bold text-gray-800">
            Okay, but how does Hotjar Surveys actually work?
          </h1>
          <p className="2xl:text-xl md:text-lg text-gray-600 2xl:max-w-full 2xl:w-full w-[400px] p-[20px] text-center">
            Why settle for one tool, when you can have it all? Give your team
            the tools they need to deliver experiences that convert, every time.
          </p>
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-8">
          {openFeedback && (
            <video
              src="/feedback.mp4"
              className="2xl:w-[700px] lg:w-[500px] w-[400px] h-auto"
              autoPlay
              loop
              muted
            />
          )}
          {openSurvey && (
            <video
              src="/surveys.mp4"
              className="2xl:w-[700px] lg:w-[500px] w-[400px] h-auto"
              autoPlay
              loop
              muted
            />
          )}

          <div className="flex flex-col items-center justify-center gap-3 w-full lg:w-[600px]">
            <div className="flex flex-col gap-4 border-2 border-gray-300 px-4 py-6 lg:w-[400px] 2xl:w-[600px] w-[400px] rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faMessage}
                    className="w-6 h-6 text-orange-700"
                  />
                  <span className="text-[17px] font-bold">Feedback</span>
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleChoices('feedback')}
                />
              </div>

              {openFeedback && (
                <div>
                  <p className="text-[13px] text-gray-400">
                    Hear directly from your users as they experience your site.
                    Find out what they love, and what’s driving them off your
                    site. Make the changes that matter.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 border-2 border-gray-300 px-4 py-6 lg:w-[400px] 2xl:w-[600px] w-[400px] rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="w-6 h-6 text-orange-700"
                  />
                  <span className="text-[17px] font-bold">Survey</span>
                </div>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleChoices('survey')}
                />
              </div>

              {openSurvey && (
                <div>
                  <p className="text-[13px] text-gray-400">
                    Bring your customer voice to your decision-making. Validate
                    your plans, measure customer satisfaction, and learn from
                    every churn.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-[10px] p-[30px]">
        <div className="flex items-center justify-center gap-4 w-full md:w-[500px]">
          <img
            alt="Avito"
            src="/avito2.png"
            className="w-[70px] h-[70px] object-contain transition-transform duration-300 hover:scale-110"
          />
          <Animated />
          <img
            alt="Hotjar"
            src="/Hotjar.png"
            className="w-[70px] h-[70px] object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="flex flex-wrap gap-5 justify-center w-full max-w-full">
          <div className="flex gap-10 flex-wrap justify-center w-full">
            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-xl w-full max-w-[400px] transition-all hover:scale-105">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-orange-600 w-4 h-4 mb-4 transition-transform duration-300 hover:rotate-12"
              />
              <h2 className="text-xl font-semibold text-orange-800 text-center">
                Gather Client Feedback
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Surveys allow you to collect direct feedback from clients about
                your products and services. Understanding their experiences can
                highlight areas for improvement, helping you better meet their
                needs.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-xl w-full max-w-[400px] transition-all hover:scale-105">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-orange-600 w-4 h-4 mb-4 transition-transform duration-300 hover:rotate-12"
              />
              <h2 className="text-xl font-semibold text-orange-800 text-center">
                Boost Your Conversions
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Collecting survey results from visitors can help you discover
                where your site is losing potential customers. By acting on that
                feedback, you can make changes to enhance user experience and
                conversion rates.
              </p>
            </div>
          </div>

          <div className="flex gap-10 flex-wrap justify-center w-full">
            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-xl w-full max-w-[400px] transition-all hover:scale-105">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-orange-600 w-4 h-4 mb-4 transition-transform duration-300 hover:rotate-12"
              />
              <h2 className="text-xl font-semibold text-orange-800 text-center">
                Enhance Customer Satisfaction
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Regularly checking in with clients via surveys demonstrates that
                you value their opinions. By acting on their feedback, you can
                enhance customer satisfaction, leading to stronger loyalty and
                increased retention.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 bg-white p-6 rounded-lg shadow-xl w-full max-w-[400px] transition-all hover:scale-105">
              <FontAwesomeIcon
                icon={faCheck}
                className="text-orange-600 w-4 h-4 mb-4 transition-transform duration-300 hover:rotate-12"
              />
              <h2 className="text-xl font-semibold text-orange-800 text-center">
                Optimize Product Development
              </h2>
              <p className="text-sm text-gray-500 text-center">
                Surveys can reveal what clients appreciate most or least about
                your product. This data can be critical in refining product
                features, driving innovation, and making informed decisions
                about future development.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-[30px] lg:gap-[30px] px-40 py-12 w-full max-w-full">
        <div className="flex flex-col items-center lg:items-start gap-[20px] w-full lg:w-[900px] sm:w-[700px] justify-center">
          <h1 className="text-center lg:text-left text-[24px] md:text-[23px] 2xl:text-[24px] font-extrabold text-gray-800 leading-snug">
            Enjoy unlimited questions
          </h1>
          <p className="text-center lg:text-left text-[16px] md:text-[18px] 2xl:text-[19px] text-gray-500 leading-relaxed max-w-[750px] mx-auto lg:mx-0">
            Ask away: there are no limits. Whether you opt for AI, choose from
            our template library, or build from scratch, you can add as many
            questions as you need to understand users. Check out the
            comprehensive question bank that comes with our free online survey
            tool. Consider including more open-ended questions to glean even
            deeper insights.
          </p>
        </div>

        <div className="relative w-full max-w-full xl:w-[700px] 2xl:w-[500px] md:w-[700px] h-[400px] md:h-[300px] overflow-hidden rounded-lg shadow-lg">
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-40 rounded-lg"></div>
          <img
            src="/2.gif"
            alt="Animated GIF"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110 rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 bg-gradient-to-br from-orange-50 via-orange-100 to-blue-50 p-8 w-full rounded-lg shadow-lg">
        <div className="flex flex-col gap-5 max-w-full 2xl:max-w-6xl w-full">
          <div className="flex flex-col items-start gap-[10px]">
            <h1 className="text-2xl md:text-3xl lg:text-3xl 2xl:text-3xl font-bold text-gray-800">
              Get started with Surveys
            </h1>
            <p className="text-sm md:text-base lg:text-sm 2xl:text-lg text-gray-600 leading-relaxed">
              Over 402 million people from 180 different countries have left
              feedback via Hotjar Surveys.
            </p>
          </div>

          {isAuthenticated ? (
            <button className="text-lg 2xl:text-xl w-full md:w-48 px-5 py-3 bg-[#0D19A3] text-white font-bold rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-900">
              Sign Out
            </button>
          ) : (
            <button className="text-lg 2xl:text-xl w-full md:w-48 px-5 py-3 bg-[#0D19A3] text-white font-bold rounded-lg shadow-md transition transform hover:scale-105 hover:bg-blue-900">
              Sign In
            </button>
          )}
        </div>

        <img
          alt="Hotjar Survey illustration"
          src="/ht.png"
          className="w-full lg:w-[700px] 2xl:w-[800px] h-[300px] lg:h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-[20px] w-full">
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="text-[20px] md:text-[25px] 2xl:text-[30px] font-bold text-gray-800">
            Try Surveys
          </h1>
          <p className="text-[14px] md:text-[18px] 2xl:text-[20px] text-gray-400 w-full">
            Curious to see how it works? Here's an embedded survey for you to
            try.
          </p>
        </div>

        <div className="hidden lg:block border-[2px] p-[20px] w-full max-w-[690px] border-gray-500 hover:border-[3px] rounded-xl shadow-xl">
          <Component
            state={state}
            nextQuestion={nextQuestion}
            setNextQuestion={setNextQuestion}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
