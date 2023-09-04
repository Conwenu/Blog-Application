import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseconfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          className="fill-in"
          type="text"
          placeholder="Enter Email"
          onChange={(event) => setEmail(event.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          className="fill-in"
          type="password"
          placeholder="Enter Password"
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </div>
      <br />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};
