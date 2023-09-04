import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseconfig";
import { signOut } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Col from "react-bootstrap/Col";
import "./Navbar.css";
export const NavigationBar = () => {
  const [user] = useAuthState(auth);
  // let displayName = !user.displayName;
  return (
    <div className="fixed-top-border">
      <div>
        <>
          <nav className="navbar">
            {" "}
            <div className="NavHolder">
              <a href="/">
                <span className="home NavItem">Home</span>
              </a>
              {user === null ? (
                <span className="TempLogInNav">
                  <a href="/signin">Log In</a>/<a href="/register">Register</a>
                </span>
              ) : (
                <>
                  <span className="displayName NavItem">
                    Signed is as {user.displayName || user.displayName}
                  </span>
                </>
              )}
              <a href="/createpost">
                <span className="addPostDiv NavItem">Add Post</span>
              </a>

              {user !== null ? (
                <span className="NavItem">
                  <button
                    className="logout"
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    Logout
                  </button>
                </span>
              ) : null}
            </div>
          </nav>
        </>
        {/* )} */}
      </div>
    </div>
  );
};
