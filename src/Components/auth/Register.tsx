import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import "./Register.css";
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/signin");
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <div className="registerContainer">
      <h1>Register</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          required
          maxLength={50}
          className="fill-in"
          type="text"
          placeholder="Enter Name"
          onChange={(event) => setName(event.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          required
          className="fill-in"
          type="text"
          placeholder="Enter Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          required
          className="fill-in"
          type="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </div>
      <br />
      <button className="register-btn" onClick={handleSignUp}>
        Sign Up
      </button>
    </div>
  );
};
