import { Timestamp, collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database, storage, auth } from "./firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "./BlogPost.css";
export default function BlogPost() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState<any>({
    Title: "",
    Text: "",
    File: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleImageChange = (event) => {
    setFormData({ ...formData, File: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.persist();
    if (!formData.Title || !formData.Text || !formData.File) {
      alert("Fill Out All of The Fields please!");
      return;
    }

    const storageRef = ref(
      storage,
      `/files/${Date.now()}${formData.File.name}`
    );
    const uploadFile = uploadBytesResumable(storageRef, formData.File);
    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          Title: "",
          Text: "",
          File: "",
          createdAt: Timestamp.now().toDate(),
        });
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          const blogRef = collection(database, "Articles");
          addDoc(blogRef, {
            Title: formData.Title,
            Text: formData.Text,
            file: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          }).then(() => {
            alert("Form Upload Success");
            console.log("Blog added successfully");
          });
          setProgress(0);
        });
      }
    );
  };
  return (
    <>
      <form>
        {!user ? (
          <>
            <br />
            <br />
            <div>
              <h2>
                <a href="/signin">Login in to post</a>
                {/* <Link to="/signin">Login in to post</Link> */}
              </h2>
              <h3>
                Don't have an account?
                <a href="/register">Create One</a>
                {/* Don't have an account? <Link to="/register">Create One</Link> */}
              </h3>
            </div>
          </>
        ) : (
          <div className="backgroundMain">
            <h1 className="form-title">Create a New Blog Post</h1>
            <label htmlFor="TitleInput" className="form-text">
              Title
              <br />
              <input
                maxLength={50}
                id="TitleInput"
                name="Title"
                className="form-control form-control-title"
                placeholder=" Title"
                value={formData.Title}
                onChange={(event) => handleChange(event)}
              ></input>
            </label>
            <br />
            <br />
            <label htmlFor="TextInput" className="form-text">
              Text
              <br />
              <textarea
                maxLength={1000}
                id="TextInput"
                name="Text"
                className="form-control form-control-text"
                placeholder=" Text"
                value={formData.Text}
                onChange={(event) => handleChange(event)}
              ></textarea>
            </label>
            <br />
            <br />
            <input
              type="file"
              id="FileUpload"
              name="FileUpload"
              className="file-upload-button"
              accept=".jpg, .png, .jpeg, .mp4, .mov, .gif"
              onChange={(event) => handleImageChange(event)}
              style={{ cursor: "pointer" }}
            ></input>
            <label htmlFor="FileUpload" className="FileUploadLabel">
              <span className="material-symbols-outlined">
                upload<div>Upload a video or image of your liking</div>
              </span>
            </label>
            <br />
            <br />
            <button
              className="create-post-button btn"
              onClick={handleSubmit}
              style={{ cursor: "pointer" }}
            >
              Create Blog Post
            </button>
            <br />
          </div>
        )}
      </form>
    </>
  );
}
