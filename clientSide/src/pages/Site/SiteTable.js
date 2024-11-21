import axios from 'axios';
import { useEffect, useState, React } from 'react';
import NavBarSign from '../Navbar/NavBarSign';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useStateProvider } from '../../context/StateContext';
import { useNavigate } from 'react-router-dom';
import QueueIcon from '@mui/icons-material/Queue';
import Modal from './Modal';
import { Table } from './Table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SiteTable = () => {
  const [sites, setSites] = useState([]);
  const [{ userInfo }] = useStateProvider();
  const [value, setValue] = useState('');
  const [filterWebsites, setFilterWebsites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState(null);
  const [editingSiteId, setEditingSiteId] = useState(null);
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get(
          `https://pro1-ubq1.onrender.com/site/GetUserSites/${userInfo._id}`
        );
        setSites(response.data.sites.createdSites);
        setFilterWebsites(response.data.sites.createdSites);
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, [userInfo._id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(
      'Tracking code copied to clipboard. Ensure that you have created a survey.'
    );
  };

  const handleDeleteClick = (id) => {
    setSiteToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (siteToDelete) {
      try {
        await axios.delete(
          `https://pro1-ubq1.onrender.com/site/deleteSite/${siteToDelete}`
        );
        setFilterWebsites(
          filterWebsites.filter((site) => site._id !== siteToDelete)
        );
        toast.success('Site deleted successfully');
      } catch (error) {
        console.error('Error deleting site:', error);
        toast.error('Failed to delete site. Please try again.');
      }
    }
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const navigateToSurveys = async () => {
    const lastSiteRes = await axios.get(
      `https://pro1-ubq1.onrender.com/site/lastSite/${userInfo._id}`
    );
    const lastSite = lastSiteRes.data;
    navigate(`/site/${lastSite.siteId}/surveys`);
  };

  const searchByUrl = async (url) => {
    try {
      const result = await axios.post(
        `https://pro1-ubq1.onrender.com/site/searchSite/${userInfo._id}`,
        { url }
      );
      setFilterWebsites(result.data.createdSites || []);
    } catch (error) {
      console.error('Error searching sites:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value) {
      searchByUrl(value);
    } else {
      setFilterWebsites(sites);
    }
  };

  const handleEditClick = (siteId, currentUrl) => {
    setEditingSiteId(siteId);
    setNewSiteUrl(currentUrl);
  };

  const handleUrlChange = (e) => {
    setNewSiteUrl(e.target.value);
  };

  const handleSaveUrl = async (siteId) => {
    try {
      await axios.post('https://pro1-ubq1.onrender.com/site/updateSiteUrl', {
        siteId,
        newUrl: newSiteUrl,
      });
      const updatedSites = filterWebsites.map((site) =>
        site._id === siteId ? { ...site, url: newSiteUrl } : site
      );
      setFilterWebsites(updatedSites);
      toast.success('Site URL updated successfully');
    } catch (error) {
      console.error('Error updating site URL:', error);
      toast.error('Failed to update site URL. Please try again.');
    }
    setEditingSiteId(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <NavBarSign />
      <div className="container mx-auto py-16 px-4">
        <div className="flex items-center justify-between gap-4 mb-6 cursor-pointer">
          <div
            className="flex items-center text-blue-600 hover:text-blue-800"
            onClick={navigateToSurveys}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span className="ml-2 text-[15px]">Back to all surveys</span>
          </div>
          <div
            className="flex items-center gap-[6px] cursor-pointer"
            onClick={() => navigate('/site')}
          >
            <button className="relative border-[2px] rounded-lg text-white font-semibold text-[15px] bg-blue-700 border-gray-400 px-[40px] py-[7px] right-[8px]">
              Add new Site
            </button>
            <QueueIcon className="absolute text-white" />
          </div>
        </div>
        <h2 className="text-[20px] font-bold mb-8 text-center text-blue-600">
          Sites & Organizations
        </h2>
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-2xl">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search by site or organisation"
              value={value}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 pl-12 text-[15px] text-gray-800 pr-4 py-2 rounded-lg focus:outline-none focus:border-blue-700"
            />
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-[17px] text-gray-500">Account Owner</h2>
            <h1 className="text-[16px] font-semibold">{userInfo?.username}</h1>
          </div>
          <div className="overflow-x-auto w-full">
            <Table
              filterWebsites={filterWebsites}
              editingSiteId={editingSiteId}
              newSiteUrl={newSiteUrl}
              handleUrlChange={handleUrlChange}
              handleSaveUrl={handleSaveUrl}
              handleEditClick={handleEditClick}
              copyToClipboard={copyToClipboard}
              handleDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
        {showModal && (
          <Modal
            title="Confirm Deletion"
            message="Are you sure you want to delete this site?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default SiteTable;
