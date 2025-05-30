import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { authServices } from "../services/api";
import { loggedUser } from "../store/auth/authSlice";

const Profile = ({ onBack }) => {
  const userData = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    bio: userData.bio || "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch()
  const toggleEdit = () => setIsEditing(!isEditing);

  const onSave = async (e) => {
    try {
      const {updatedUser, message} = await authServices.update(
        formData.fullName,
        formData.password
      );
      dispatch(loggedUser(updatedUser))
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser))
      toast.success(message);
      setIsEditing(false)
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      console.log(message);
      toast.error(message);
    }
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "";

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="relative w-full max-w-2xl p-6 rounded-2xl shadow-xl bg-white/30 backdrop-blur-md border border-white/30 flex flex-col gap-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-rose-600 hover:text-rose-800 text-2xl transition"
        >
          <RxCross2 />
        </button>

        {/* Edit Button */}
        <button
          onClick={toggleEdit}
          className="absolute top-4 right-14 text-rose-600 hover:text-rose-800 text-xl transition"
        >
          <FiEdit />
        </button>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-6 items-center w-full">
          {/* Avatar */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-rose-300 shadow-md flex items-center justify-center bg-white text-rose-600 text-4xl font-bold">
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              getInitial(userData.fullName)
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <input
              readOnly={!isEditing}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className={`w-full text-3xl font-semibold ${
                isEditing
                  ? "text-rose-600 focus:ring-2 ring-rose-300"
                  : "text-gray-800"
              } bg-transparent outline-none transition rounded`}
            />

            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                className="w-full text-gray-700 bg-transparent outline-none border-b border-rose-200 focus:ring-2 focus:ring-rose-300 rounded"
                placeholder="Write your bio here"
              />
            ) : (
              <p className="text-gray-700 font-medium">
                {userData.bio || "Write your bio here"}
              </p>
            )}

            <p className="text-sm text-gray-600">{userData.email}</p>

            {isEditing && (
              <input
                type="password"
                placeholder="New password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full text-sm text-gray-700 bg-transparent outline-none border-b border-rose-200 focus:ring-2 focus:ring-rose-300 rounded"
              />
            )}
          </div>
        </div>

        {/* Buttons */}
        {isEditing && (
          <div className="flex gap-4 justify-center md:justify-end w-full">
            <button
              onClick={onSave}
              className="text-rose-600 hover:text-rose-800 text-lg transition"
            >
              Save
            </button>
            <button
              onClick={toggleEdit}
              className="text-rose-600 hover:text-rose-800 text-lg transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
