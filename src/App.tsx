import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPost from "./Components/BlogPost";
import Blogs from "./Components/Blogs";
import { Register } from "./Components/auth/Register";
import PostItem from "./Components/PostItem";
import { Login } from "./Components/auth/Login";

import "./App.css";
import { NavigationBar } from "./Components/Navbar";
export default function App() {
  return (
    <>
      <div className="container">
        <NavigationBar />
        <Router>
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/" element={<Blogs />} />
            <Route path="/home" element={<Blogs />} />
            <Route path="/article/:id" element={<PostItem />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createpost" element={<BlogPost />} />
          </Routes>
          <div className="row">
            <div className="col-md-8"></div>
            <div className="col-md-4"></div>
          </div>
        </Router>
      </div>
    </>
  );
}
