import { useEffect, useState, React } from 'react';
import NavBarSign from '../Navbar/NavBarSign';
import SideBarLeft from '../SideBar/SideBarLeft';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useStateProvider } from '../../context/StateContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';

const TeamList = () => {
  const [members, setMembers] = useState([]);
  const [creator, setCreator] = useState({});
  const [{ userInfo }] = useStateProvider();
  const [site, setSite] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const socket = io(`https://hotjar-app.onrender.com`, {
    transports: ['websocket', 'polling'],
  });

  const handleRoleChange = async (event, member) => {
    const newRole = event.target.value;

    try {
      const result = await axios.post(
        `https://hotjar-app.onrender.com/site/updateRole/${id}/${userInfo._id}/${member.user._id}`,
        { newRole }
      );
      if (result.status === 200) {
        toast.success(
          `Role changed to ${newRole.replace('_', ' ')} for ${member.user.username}!`
        );
        setMembers((prevMembers) =>
          prevMembers.map((m) =>
            m.user._id === member.user._id ? { ...m, role: newRole } : m
          )
        );
        const msg = `${userInfo.username} changed your role to ${newRole} in the site ${site.name}`;
        await axios.post(
          `https://hotjar-app.onrender.com/notification/createNotif`,
          {
            recipientId: member.user._id,
            senderId: userInfo._id,
            message: msg,
          }
        );
        socket.emit('sendInvite', {
          recipientId: member.user._id,
          message: `${userInfo.username} changed your role to ${newRole} in the site ${site.name}`,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error('Error updating member role:', error);
    }
  };

  const deleteMember = async (member) => {
    try {
      const result = await axios.get(
        `https://hotjar-app.onrender.com/site/deleteMember/${id}/${userInfo._id}/${member.user._id}`
      );
      if (result.status === 200) {
        const updatedMembers = members.filter(
          (elem) => elem.user._id !== member.user._id
        );
        setMembers(updatedMembers);
        toast.success(
          `The user ${member.user.username} is no longer a member of the site ${site.name}.`
        );
        const msg = `You are no longer a member of the site ${site.name}`;
        await axios.post(
          `https://hotjar-app.onrender.com/notification/createNotif`,
          {
            recipientId: member.user._id,
            senderId: userInfo._id,
            message: msg,
          }
        );
        socket.emit('sendInvite', {
          recipientId: member.user._id,
          message: `You are no longer a member of the site ${site.name}`,
        });
      }
    } catch (error) {
      console.error('Error deleting member user:', error);
      toast.error(error.response.data);
    }
  };

  const navigateToTeam = () => {
    navigate(`/site/${id}/team/invite`);
  };

  useEffect(() => {
    const listedMembers = async () => {
      try {
        const response = await axios.get(
          `https://hotjar-app.onrender.com/site/listedMembers/${id}`
        );
        setMembers(response.data.members);
        setCreator(response.data.creator);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
    listedMembers();
  }, [id]);

  useEffect(() => {
    const getSiteId = async () => {
      try {
        const result = await axios.get(
          `https://hotjar-app.onrender.com/site/getSiteId/${id}/${userInfo?._id}`
        );
        setSite(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getSiteId();
  }, [id, userInfo?._id]);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <SideBarLeft />
      <div className="flex-1 p-6 overflow-auto">
        <NavBarSign />
        <div className="flex flex-col gap-[60px] bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-[17px] font-bold text-gray-800 mb-6">
              Team Members
            </h1>
            <div className="flex items-center relative">
              <FontAwesomeIcon
                icon={faUserPlus}
                className="absolute text-white p-[10px] text-[14px]"
              />
              <button
                className={`text-[14px] border-[2px] border-white ${userInfo._id === creator._id ? 'bg-orange-700 hover:bg-orange-800' : 'bg-gray-400 cursor-not-allowed'} shadow-lg w-[280px] py-[10px] font-medium text-white rounded-lg`}
                onClick={userInfo._id === creator._id ? navigateToTeam : null}
                disabled={userInfo._id !== creator._id}
              >
                Invite Team Members
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div className="mb-6">
              <h2 className="text-[14px] font-semibold underline text-blue-900">
                Site Creator
              </h2>
              {creator.username && (
                <div className="bg-white p-4 rounded shadow-md mb-2">
                  <p className="font-medium text-[14px]">{creator.username}</p>
                  <p className="text-gray-500 text-[14px]">{creator.email}</p>
                </div>
              )}
            </div>

            {userInfo._id === creator._id ? (
              <div className="flex flex-col gap-[20px]">
                <h2 className="text-[17px] font-semibold text-orange-950 mb-4 mt-8">
                  Members
                </h2>
                <table className="min-w-full bg-white rounded-lg border border-gray-200">
                  <thead className="bg-orange-700">
                    <tr>
                      <th className="py-3 px-4 border-b text-[14px] text-left font-bold text-white">
                        Username
                      </th>
                      <th className="py-3 px-4 border-b text-left text-[14px] font-bold text-white">
                        Email
                      </th>
                      <th className="py-3 px-4 border-b text-left text-[14px] font-bold text-white">
                        Access
                      </th>
                      <th className="py-3 px-4 border-b text-left text-[14px] font-bold text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.length > 0 ? (
                      members.map((member) => (
                        <tr
                          key={member.user._id}
                          className="hover:bg-gray-100 transition duration-200"
                        >
                          <td className="py-3 px-4 border-b font-medium text-[13px] text-gray-800">
                            {member.user.username}
                          </td>
                          <td className="py-3 px-4 border-b font-medium text-[13px] text-gray-800">
                            {member.user.email}
                          </td>
                          <td className="py-3 px-4 border-b font-medium text-[13px] text-gray-800">
                            <select
                              value={member.role}
                              onChange={(event) =>
                                handleRoleChange(event, member)
                              }
                              className="border border-gray-300 cursor-pointer rounded px-2 py-1"
                            >
                              <option value="read">Read</option>
                              <option value="read_write">Read_Write</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 border-b font-medium text-gray-800 cursor-pointer">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-orange-800"
                              onClick={() => deleteMember(member)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="py-3 px-4 border-b text-center text-[15px] text-gray-500"
                        >
                          No members added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                <h2 className="text-[14px] text-gray-700">
                  You are not the site creator.
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamList;
