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
        `http://localhost:8000/site/lastSite/${userInfo._id}`
      );
      if (lastSiteRes.status === 200) {
        const lastSite = lastSiteRes.data;
        navigate(`/site/${lastSite.siteId}/surveys`);
      } else {
        navigate('/site');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`relative bg-white border-r-[0.5px] border-solid border-gray-300 transition-all duration-500 ease-in-out ${open ? 'w-[140px]' : 'w-[60px]'}`}
    >
      <div
        className={`flex flex-col items-center  justify-between  min-h-[100vh] p-2 transition-all duration-500 ease-in-out`}
      >
        <div className={`flex flex-col items-center`}>
          <img
            src="/avito-logo.png"
            alt=""
            className="flex items-center w-[30px] h-[30px]"
          />
          <div className="flex flex-col py-[60px] cursor-pointer gap-[50px] border-b-[3px]">
            <div
              className={`relative flex items-center gap-[20px] ${open && 'hover:bg-gray-100  w-[130px] py-[8px]  rounded-lg'}`}
              onMouseEnter={(e) => handleMouseEnter(e, 'Home')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('home')}
            >
              <HouseOutlinedIcon
                className="cursor-pointer transition-all duration-200 text-gray-700 rounded-lg hover:border hover:border-gray-100 hover:bg-gray-100 hover:text-[#0D19A3]"
                style={{
                  width: open ? '23px' : '23px',
                  height: open ? '23px' : '23px',
                }}
              />
              {open && <h1 className="text-[17px] text-gray-600">Home</h1>}
            </div>
            <div
              className={`relative flex items-center gap-[20px] px-[5px] ${open && 'hover:bg-gray-100 ]  w-[120px] py-[8px] rounded-lg'}`}
              onMouseEnter={(e) => handleMouseEnter(e, 'Sites')}
              onMouseLeave={handleMouseLeave}
              onClick={navigateAllSite}
            >
              <LanguageIcon
                className="cursor-pointer transition-all duration-200 text-gray-700 hover:border hover:border-gray-100 hover:bg-gray-200 hover:text-[#0D19A3]"
                style={{
                  width: open ? '20px' : '18px',
                  height: open ? '20px' : '18px',
                }}
              />
              {open && <h1 className="text-[17px] text-gray-600">Sites</h1>}
            </div>
          </div>
          <div className="  p-[20px] items-center  flex flex-col gap-[50px] cursor-pointer">
            <div
              className={`relative flex items-center gap-[20px] ${open && 'hover:bg-gray-100  w-[130px] py-[8px] px-[8px] rounded-lg'}`}
              onMouseEnter={(e) => handleMouseEnter(e, 'Surveys')}
              onMouseLeave={handleMouseLeave}
              onClick={handleSurveys}
            >
              <InsertCommentOutlinedIcon
                className="transition-all duration-200 text-gray-700 rounded-lg hover:border hover:border-gray-100 hover:bg-gray-100 hover:text-[#0D19A3] cursor-pointer"
                style={{
                  width: open ? '20px' : '18px',
                  height: open ? '20px' : '18px',
                }}
              />
              {open && <h1 className="text-[17px] text-gray-600">Surveys</h1>}
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
          className="flex items-center gap-[20px] cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <CompareArrowsIcon className="text-gray-700 cursor-pointer text-[15px] hover:text-gray-700 transition-colors duration-300 ease-in-out" />
          {open && (
            <h1 className="lg:text-[17px] text-[10px] text-gray-500">
              Collapse
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarLeft;
