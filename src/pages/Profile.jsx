import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [username, setUsername] = useState("");

  const updateProfile = () => {
    axios.put("/api/profile", { username }).then(() => alert("Profile updated!"));
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <input
        type="text"
        placeholder="New Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  );
};

export default Profile;
