import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import {
  createLiveStream,
  fetchLiveStreams,
  deleteLiveStream,
} from "../../../services/operations/admin";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from 'sweetalert2';
import Modal from '../Modal'; // Import the Modal component

function LiveStream() {
  const [openCreate, setCreate] = useState(false);
  const [openEdit, setEdit] = useState(false);
  const [editingStream, setEditingStream] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const [liveStreamsList, setLiveStreamsList] = useState([]);
  const [liveStream, setLiveStream] = useState({
    name: "",
    active: true,
    url: "",
  });

  useEffect(() => {
    const fetchLiveStreamsList = async () => {
      try {
        const response = await fetchLiveStreams();
        setLiveStreamsList(response || []); // Ensure response is an array
      } catch (error) {
        console.error("Error fetching live streams:", error);
      }
    };

    fetchLiveStreamsList();
  }, []);

  const handleCreateLiveStream = async () => {
    try {
      await createLiveStream(liveStream, token);
      const response = await fetchLiveStreams();
      setLiveStreamsList(response || []);
      setCreate(false);
      setLiveStream({ name: "", active: true, url: "" });
    } catch (error) {
      console.error("Error creating live stream:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLiveStream(id, token);
      setLiveStreamsList((prevStreams) =>
        prevStreams.filter((stream) => stream._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete live stream:", error);
    }
  };

  const handleActive = async (id, currentActiveStatus) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/live/update/${id}`,
        { active: !currentActiveStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res?.data?.success) {
        setLiveStreamsList((prevStreams) =>
          prevStreams.map((item) =>
            item._id === id ? { ...item, active: !currentActiveStatus } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update live stream:", error);
    }
  };

  const handleEditLiveStream = (stream) => {
    setEditingStream(stream);
    setEdit(true);
  };

  const handleUpdateLiveStream = async () => {
    // Show loading SweetAlert2
    Swal.fire({
      title: 'Updating...',
      text: 'Please wait while the live stream is being updated.',
      icon: 'info',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/live/livestream/${editingStream._id}`,
        editingStream,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res?.data?.success) {
        const response = await fetchLiveStreams();
        setLiveStreamsList(response || []);
        setEdit(false);
        setEditingStream(null);
  
        // Update SweetAlert2 to success
        Swal.fire({
          title: 'Success!',
          text: 'The live stream has been successfully updated.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        throw new Error('Failed to update live stream.');
      }
    } catch (error) {
      console.error('Error updating live stream:', error);
  
      // Update SweetAlert2 to error
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the live stream. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="text-center text-2xl font-semibold underline mb-4">
        <h4>Live Streams</h4>
      </div>

      <div className="flex justify-end mb-4">
        {user?.permissions?.canAdd && (
          <button
            onClick={() => setCreate(!openCreate)}
            className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 focus:outline-none"
          >
            <FaPlusCircle /> Create Live Stream
          </button>
        )}
      </div>

      {openCreate && (
        <div className="mb-4 p-4 border rounded-lg">
          <h5 className="text-xl font-semibold mb-2">Create Live Stream</h5>
          <input
            type="text"
            placeholder="Name"
            value={liveStream.name}
            onChange={(e) =>
              setLiveStream({ ...liveStream, name: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="URL"
            value={liveStream.url}
            onChange={(e) =>
              setLiveStream({ ...liveStream, url: e.target.value })
            }
            className="w-full mb-2 p-2 border rounded focus:outline-none"
          />
          <button
            onClick={handleCreateLiveStream}
            className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Create
          </button>
        </div>
      )}

      <Modal
        show={openEdit && editingStream}
        onClose={() => setEdit(false)}
        onSave={handleUpdateLiveStream}
      >
        <input
          type="text"
          placeholder="Name"
          value={editingStream?.name || ""}
          onChange={(e) =>
            setEditingStream({ ...editingStream, name: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded focus:outline-none"
        />
        <input
          type="text"
          placeholder="URL"
          value={editingStream?.url || ""}
          onChange={(e) =>
            setEditingStream({ ...editingStream, url: e.target.value })
          }
          className="w-full mb-2 p-2 border rounded focus:outline-none"
        />
      </Modal>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">URL</th>
              <th className="px-4 py-2 border">Active</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveStreamsList.map((stream) => (
              <tr key={stream._id}>
                <td className="px-4 py-2 border">{stream.name}</td>
                <td className="px-4 py-2 border">{stream.url}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleActive(stream._id, stream.active)}
                    className={`px-4 py-2 rounded ${
                      stream.active ? "bg-green-600" : "bg-red-600"
                    } text-white hover:opacity-75`}
                  >
                    {stream.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-2 border flex space-x-2">
                  {user?.permissions?.canEdit && (
                    <button
                      onClick={() => handleEditLiveStream(stream)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
                    >
                      Edit
                    </button>
                  )}
                  {user?.permissions?.canDelete && (
                    <button
                      onClick={() => handleDelete(stream._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LiveStream;
