import {
  faArrowPointer,
  faLocationDot,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { React } from 'react';

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-10 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full w-full ">
      <div className="container mx-auto flex flex-col p-[20px] md:flex-row 2xl:gap-[300px] md:gap-[50px] lg:gap-[70px] items-start ">
        <div className="flex-flex-col items-start">
          <h4 className="font-bold 2xl:text-[20px] md:text-[14px] xl:text-[14px] mb-2">
            About Us
          </h4>
          <p className="text-gray-400 2xl:text-[13px] md:text-[13px]  ">
            Learn more about our survey tool and how it helps you gather
            valuable insights to improve your business.
          </p>
        </div>
        <div className="flex flex-col md:flex-row p-[3px] 2xl:gap-[40px] lg:gap-[80px] ">
          <div className="2xl:w-[300px]">
            <h4 className="font-bold 2xl:text-[20px] md:text-[14px] xl:text-[14px] mb-2 ">
              Quick Links
            </h4>
            <ul className="text-gray-400 2xl:text-[13px] sm:text-[13px]">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="2xl:w-[300px]">
            <h4 className="font-bold  mb-2 2xl:text-[20px] md:text-[14px] xl:text-[14px] sm:text-[10px]">
              Get in Touch
            </h4>
            <ul className="text-gray-400 2xl:text-[13px] sm:text-[10px]">
              <li>
                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                62 Forum Bab Abdelaziz، Casablanca 20000
              </li>
              <li>
                <FontAwesomeIcon icon={faMessage} className="mr-2" />
                soukaina.ouchen@avito.ma
              </li>
              <li>
                <FontAwesomeIcon icon={faArrowPointer} className="mr-2" />
                www.surveyapp.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">
        &copy; 2024 Survey Platform. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
