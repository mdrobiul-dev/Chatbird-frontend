import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { authServices } from "../services/api";
import { loggedUser } from "../store/auth/authSlice";
import { MdOutlineCloudUpload } from "react-icons/md";
import { motion } from "framer-motion";

const Profile = ({ onBack }) => {
  const userData = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    fullName: userData.fullName,
    bio: userData.bio || "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null); // committed avatar file
  const [tempAvatarFile, setTempAvatarFile] = useState(null); // temporary preview during edit
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // enter edit mode
      setTempAvatarFile(null);
    } else {
      // cancel editing
      setFormData({
        fullName: userData.fullName,
        bio: userData.bio || "",
        password: "",
      });
      setTempAvatarFile(null);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempAvatarFile(file);
    }
  };

  const avatarPreview = isEditing
    ? tempAvatarFile
      ? URL.createObjectURL(tempAvatarFile)
      : userData?.avatar
    : userData?.avatar;

  const onSave = async () => {
    try {
      setIsUploading(true);
      const form = new FormData();
      form.append("fullName", formData.fullName);
      if (formData.password) form.append("password", formData.password);
      if (tempAvatarFile) form.append("avatar", tempAvatarFile);

      const { updatedUser, message } = await authServices.update(form);
      dispatch(loggedUser(updatedUser));
      localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
      toast.success(message);
      setIsEditing(false);
      setAvatarFile(tempAvatarFile); // commit avatar
      setTempAvatarFile(null);
    } catch (error) {
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";
      console.error(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const getInitial = (name) => name?.charAt(0).toUpperCase() || "";

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          width: "320px",
          zIndex: 9999,
        }}
        toastStyle={{
          marginBottom: "0.75rem",
        }}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl p-6 rounded-2xl shadow-xl bg-white/30 backdrop-blur-md border border-white/30 flex flex-col gap-6"
      >
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-rose-600 hover:text-rose-800 text-2xl transition"
        >
          <RxCross2 />
        </button>

        <button
          onClick={toggleEdit}
          className="absolute top-4 right-14 text-rose-600 hover:text-rose-800 text-xl transition"
        >
          <FiEdit />
        </button>

        <div className="flex flex-col md:flex-row gap-6 items-center w-full">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-rose-300 shadow-md flex items-center justify-center bg-white text-rose-600 text-4xl font-bold">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-full h-full object-cover transition"
              />
            ) : (
              getInitial(userData.fullName)
            )}

            {/* Upload icon (only when editing & no preview selected) */}
            {isEditing && !tempAvatarFile && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 cursor-pointer transition rounded-full">
                <MdOutlineCloudUpload className="text-3xl text-white drop-shadow" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            )}

            {/* Uploading overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                <div className="w-6 h-6 border-4 border-rose-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

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

        {isEditing && (
          <div className="flex gap-4 justify-center md:justify-end w-full">
            <button
              onClick={onSave}
              disabled={isUploading}
              className={`text-lg transition ${
                isUploading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-rose-600 hover:text-rose-800"
              }`}
            >
              {isUploading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={toggleEdit}
              disabled={isUploading}
              className="text-rose-600 hover:text-rose-800 text-lg transition"
            >
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Profile;
