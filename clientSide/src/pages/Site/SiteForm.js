import axios from 'axios';
import { useEffect, useState, React } from 'react';
import NavBarSign from '../Navbar/NavBarSign';
import { useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStateProvider } from '../../context/StateContext';
import SideBarLeft from '../SideBar/SideBarLeft';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SiteForm = () => {
  const navigate = useNavigate();
  const [{ userInfo }] = useStateProvider();

  const [site, setSite] = useState({
    organisation: '',
    name: '',
    url: '',
    userId: '',
  });

  useEffect(() => {
    if (userInfo && userInfo._id) {
      setSite((prevSite) => ({
        ...prevSite,
        userId: userInfo._id,
      }));
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setSite({ ...site, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://localhost:8000/site/AddSite',
        site
      );
      toast.success('Site added successfully');
      navigate('/sites');
    } catch (error) {
      console.log('error-->', error);
      console.error('Error adding site:', error);
      toast.error(error.response.data.message);
    }
  };

  const navigateToSurveys = async () => {
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
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      <SideBarLeft />
      <div className="flex-1 overflow-hidden">
        <NavBarSign />
        <div className="flex flex-1 overflow-hidden p-6 md:p-10">
          <div className="mx-auto flex flex-col w-full max-w-6xl">
            <div className="flex items-center gap-4 lg:mb-[8rem] mb-[30px] cursor-pointer">
              <div
                className="flex items-center text-blue-600 hover:text-blue-800"
                onClick={navigateToSurveys}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
                <span className="ml-2 text-[17px]">Back to all surveys</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-10 p-6 md:p-10 w-full bg-white shadow-md rounded-lg">
              <div className="w-full md:max-w-2xl bg-white p-6 rounded-lg shadow-lg border border-blue-300">
                <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
                  Add New Site
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <label
                      htmlFor="organisation"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="organisation"
                      value={site.organisation}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 text-gray-800 text-sm border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 hover:border-blue-400 ease-in-out transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Site Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={site.name}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 text-gray-800 text-sm border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 hover:border-blue-400 ease-in-out transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="url"
                      className="block text-gray-700 text-sm font-medium"
                    >
                      Site URL <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-400 text-xs mb-1">
                      Input your site&apos;s main URL (including https://) and
                      we&apos;ll automatically track all its subdomains and
                      subdirectories.
                    </p>
                    <input
                      type="url"
                      name="url"
                      value={site.url}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 text-gray-800 text-sm border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 hover:border-blue-400 ease-in-out transition-all duration-300"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-lg font-medium transition-all duration-300"
                  >
                    Add Site
                  </button>
                </form>
              </div>
              <img
                src="/yess.png"
                alt="Site illustration"
                className="rounded-lg shadow-lg w-full max-w-lg mt-6 md:mt-0 lg:block hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteForm;
