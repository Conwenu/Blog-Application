import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, database } from "./firebaseconfig";
import LikeBlogPost from "./auth/LikeBlogPost";
import Comment from "./Comments";
import DeleteBlogPost from "./DeleteBlogPost";
import "./PostItem.css";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);
  const images = ["png", "jpg", "jpeg"];
  const videos = ["mp4", "mov", "webm"];
  useEffect(() => {
    const docRef = doc(database, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
  return (
    <div className="container border bg-light" style={{ marginTop: 70 }}>
      {article !== null && (
        <div className="row">
          <h1 className="Title">{article.Title}</h1>
          <h2 className="Author">{article.createdBy}</h2>
          <div> Posted on: {article.createdAt.toDate().toDateString()}</div>
          <hr />
          <h4 className="postText">{article.Text}</h4>
          <div className="col-3">
            {videos.some((term) => article.file.includes(term)) ? (
              <video controls style={{ height: 350, width: 750 }}>
                <source src={article.file}></source>
              </video>
            ) : (
              <img
                style={{ height: "25%", width: "25%" }}
                src={article.file}
              ></img>
            )}
          </div>
          <hr />
          <div className="col-9 mt-3">
            <div className="d-flex flex-row-reverse">
              {user && <LikeBlogPost id={id} likes={article.likes} />}
              <div className="pe-2">
                <p>{article.likes.length + " Likes"}</p>
              </div>
            </div>

            <Comment id={article.id} />
          </div>
        </div>
      )}
    </div>
  );
}
