import React, { useState } from 'react';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ToolTip from './ToolTip';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../../context/StateContext';
import axios from 'axios';

const SideBarLeft = () => {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState({
    text: '',
    visible: false,
    position: { top: 0, left: 0 },
  });
  const [open, setOpen] = useState(false);
  const [{ userInfo }] = useStateProvider();

  const handleMouseEnter = (e, text) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      text,
      visible: true,
      position: { top: rect.top + window.scrollY, left: rect.right + 10 },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const handleClick = (type) => {
    if (type === 'home') {
      navigate('/');
    }
    if (type === 'survey') {
      navigate('/surveys');
    }
  };

  const navigateAllSite = () => {
    navigate('/sites');
  };

  const handleSurveys = async () => {
    try {
      const lastSiteRes = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/site/lastSite/${userInfo._id}`
      );
      if (lastSiteRes.status === 200) {
        const lastSite = lastSiteRes.data;
        navigate(`/site/${lastSite.siteId}/surveys`);
      } else {
        navigate('/site');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`relative bg-gradient-to-b from-gray-100 to-gray-300 border-r border-gray-300 shadow-lg transition-all duration-500 ease-in-out ${
        open ? 'w-[180px]' : 'w-[60px]'
      }`}
    >
      <div
        className={`flex flex-col items-center justify-between min-h-[100vh] p-4 transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col items-center">
          <img
            src="/avito-logo.png"
            alt="Logo"
            className="w-[40px] h-[40px] mb-8"
          />
          <div className="flex flex-col gap-8 border-b border-gray-400 pb-8">
            <div
              className={`relative flex items-center cursor-pointer gap-4 ${
                open ? 'px-4 py-2' : 'p-2'
              } hover:bg-gray-200 rounded-lg transition-all duration-300`}
              onMouseEnter={(e) => handleMouseEnter(e, 'Home')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('home')}
            >
              <HouseOutlinedIcon
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                style={{ fontSize: open ? '24px' : '20px' }}
              />
              {open && <span className="text-gray-700 font-medium">Home</span>}
            </div>
            <div
              className={`relative flex cursor-pointer items-center gap-4 ${
                open ? 'px-4 py-2' : 'p-2'
              } hover:bg-gray-200 rounded-lg transition-all duration-300`}
              onMouseEnter={(e) => handleMouseEnter(e, 'Sites')}
              onMouseLeave={handleMouseLeave}
              onClick={navigateAllSite}
            >
              <LanguageIcon
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                style={{ fontSize: open ? '24px' : '20px' }}
              />
              {open && <span className="text-gray-700 font-medium">Sites</span>}
            </div>
            <div
              className={`relative flex cursor-pointer items-center gap-4 ${
                open ? 'px-4 py-2' : 'p-2'
              } hover:bg-gray-200 rounded-lg transition-all duration-300`}
              onMouseEnter={(e) => handleMouseEnter(e, 'Surveys')}
              onMouseLeave={handleMouseLeave}
              onClick={handleSurveys}
            >
              <InsertCommentOutlinedIcon
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                style={{ fontSize: open ? '24px' : '20px' }}
              />
              {open && (
                <span className="text-gray-700 font-medium">Surveys</span>
              )}
            </div>
          </div>
        </div>

        {tooltip.visible && !open && (
          <ToolTip
            text={tooltip.text}
            style={{
              position: 'absolute',
              top: tooltip.position.top,
              left: tooltip.position.left,
              backgroundColor: 'black',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              fontWeight: 'bold',
            }}
          />
        )}
        <div
          className="flex items-center gap-4 cursor-pointer mt-8"
          onClick={() => setOpen(!open)}
        >
          <CompareArrowsIcon
            className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            style={{ fontSize: '20px' }}
          />
          {open && <span className="text-gray-700 font-medium">Collapse</span>}
        </div>
      </div>
    </div>
  );
};

export default SideBarLeft;
