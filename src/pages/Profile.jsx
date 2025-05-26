import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const Profile = ({ onBack }) => {
  const userData = useSelector((state) => state.auth.user);
  console.log(userData);

  const getInitial = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-pink-300 via-pink-200 to-sky-300 bg-opacity-90 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl p-6 rounded-2xl shadow-lg bg-white/20 backdrop-blur-lg border border-white/30 flex flex-col md:flex-row gap-6 items-center">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute cursor-pointer top-4 right-4 text-pink-600 hover:text-pink-800 text-2xl transition-all duration-200"
        >
          <RxCross2 />
        </button>

        {/* Avatar */}
        <div className="w-32 h-32 md:w-40 md:h-38 rounded-full overflow-hidden border-3 border-pink-300 shadow-md">
          {userData?.avatar ? (
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            getInitial(userData.fullName)
          )}
        </div>

        {/* Info */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">
            {userData.fullName}
          </h2>
          {userData?.bio ? (
            <p className="text-gray-700 font-medium mb-2">{userData?.bio}</p>
          ) : (
            <p className="text-gray-700 font-medium mb-2">
              write your bio here
            </p>
          )}
          <p className="text-sm text-gray-600">{userData.email}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
