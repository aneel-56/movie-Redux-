import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { toastSuccess, toastFailure } from "../../utils/toastify";

// react Toasting
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialRegistered from "../../components/SocialRegistered";

const UpdatePassword = () => {
  const { _id, socialLogin } = useSelector((state) => {
    return state.user.user;
  });

  console.log("social", socialLogin);

  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(false);

  const [previous, setPrevious] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    const low = previous.length > 8 && newpass.length > 8 && confirm.length > 8;
    if (low == disabled) {
      return;
    }
    console.log("disable changed", low, disabled);
    setDisabled(low);
  }, [previous, newpass, confirm]);

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/user/update-password/" + _id,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ _id, previous, newpass, confirm }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setError("");
        toast("Password Changed", { ...toastSuccess });
      } else if (!response.ok) {
        setError(data.error);
        toast("Password Changed Failed", { ...toastFailure });
      }
      console.log("data", data);
    } catch (error) {
      setError(error.message);
    }
  };
  if (socialLogin) {
    return <SocialRegistered></SocialRegistered>;
  }
  return (
    <form className="update-password dotted-border" onSubmit={handleChange}>
      <h1>Update Password</h1>
      <h2>Previous Password:</h2>
      <input
        type="text"
        value={previous}
        onChange={(e) => setPrevious(e.target.value)}
        required
        minLength={8}
      />
      <h2>New Password:</h2>
      <input
        type="text"
        value={newpass}
        onChange={(e) => setNewpass(e.target.value)}
        required
        minLength={8}
      />
      <h2>Confirm Password:</h2>
      <input
        type="text"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
        minLength={8}
      />
      <p
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "0.2em",
          fontSize: "1.2rem",
          height: "25px",
        }}
      >
        {error}
      </p>
      <div>
        <button disabled={!disabled}>Change Password</button>
      </div>
    </form>
  );
};

export default UpdatePassword;
