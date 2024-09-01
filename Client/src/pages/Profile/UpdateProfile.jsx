import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutOrSignout } from "../../store/index";
import { toast } from "react-toastify";
import { toastFailure } from "../../utils/toastify";
import { loginOrRegister } from "../../store/slices/userSlice";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  // console.log("user", user);

  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [file, setFile] = useState(user.imageData);

  console.log("file", file);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePhoneChange = (event) => setPhone(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(file, username, phone, email);
    const formData = new FormData();
    formData.append("mobile", phone);
    formData.append("image", file);
    formData.append("username", username);

    try {
      const response = await fetch(
        `http://localhost:3000/user/update-account/${user._id}`,
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          body: formData,
        }
      );
      const data = await response.json();
      // console.log("data", data);
      if (response.ok) {
        localStorage.setItem("token-movie", JSON.stringify(data.data));
        dispatch(loginOrRegister(data.data));
      } else {
        throw Error(data.error);
      }
    } catch (error) {
      toast.error("Updation Failed", toastFailure);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/delete-account/${user._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("response", response);
      console.log("data", data);
      if (response.ok) {
        toast.success("Your account Deleted");
        dispatch(logoutOrSignout());
        localStorage.removeItem("token-movie");
        navigate("/");
      } else {
        throw Error(data.error);
      }
    } catch (error) {
      toast.error(error.message || "Delete Account Failed");
    }
  };

  console.log("typeof", typeof file);

  const img =
    file && typeof file === "object"
      ? URL.createObjectURL(file)
      : typeof file === "string"
      ? file.startsWith("http")
        ? file
        : "data:image/png;base64," + file
      : "";

  console.log("img", img);

  return (
    <div className="update-profile dotted-border">
      <h2>Profile</h2>
      <div className="update-profile-file">
        <h3>Profile Picture</h3>
        <div>
          <input type="file" name="" id="" onChange={handleFileChange} />
          <img
            src={
              img

              // ? `data:image/png;base64,${file}`
              // : typeof file === "string"
              // ? file
              // : file && URL.createObjectURL(file) // Use URL.createObjectURL for File objects
            }
            alt=""
          />
        </div>
      </div>
      <div>
        <h3>Username</h3>
        <input
          type="text"
          placeholder="Enter the full name..."
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <h3>Email</h3>
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter your Email here..."
          readOnly
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <h3>Phone</h3>
        <input
          type="tel"
          name=""
          id=""
          placeholder="Enter your Phone here..."
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>
      <div className="delete-update">
        <button className="delete-update-first" onClick={handleDeleteUser}>
          Delete Account
        </button>
        <button
          className="delete-update-second"
          type="submit"
          onClick={handleSubmit}
        >
          Update Account
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
