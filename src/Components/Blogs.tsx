import React, { useState, useEffect } from "react";
import { database, storage, auth } from "./firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteBlogPost from "./DeleteBlogPost";
import { Link } from "react-router-dom";
import LikeBlogPost from "./auth/LikeBlogPost";
import "./Blogs.css";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
export default function Blogs() {
  const [user] = useAuthState(auth);
  const [newBlog, setNewBlog] = useState([] as any);
  const images = [".png", ".jpg", ".jpeg"];
  const videos = [".mp4", ".mov", ".webm"];
  useEffect(() => {
    const blogRef = collection(database, "Articles");
    const q = query(blogRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const blogValue = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewBlog(blogValue);
      console.log("a", blogValue);
    });
  }, []);
  return (
    <>
      <div>
        {newBlog.length === 0 ? (
          <p>No Articles Found</p>
        ) : (
          newBlog.map(
            ({
              id,
              Title,
              Text,
              file,
              createdAt,
              createdBy,
              userId,
              likes,
              comments,
            }) => (
              <div className="border mt-3 p-3 bg-light " key={id}>
                <div className="row">
                  <Link to={`/article/${id}`}>
                    <h2 className="postTitle al1">{Title}</h2>
                  </Link>
                  <div className="postAuthor">
                    {createdBy && (
                      <span className="badge bg-primary">{createdBy}</span>
                    )}
                  </div>

                  <div className="media">
                    {videos.some((term) => file.includes(term)) ? (
                      <video controls style={{ height: 350, width: 750 }}>
                        <source src={file}></source>
                      </video>
                    ) : (
                      <img
                        style={{ height: "25%", width: "25%" }}
                        src={file}
                      ></img>
                    )}
                  </div>
                  <div className="col-9 ps-3">
                    <h3>{Text}</h3>
                    <p>{createdAt.toDate().toDateString()}</p>
                    <div className="d-flex flex-row-reverse">
                      {user && <LikeBlogPost id={id} likes={likes} />}
                      <div className="pe-2">
                        <p>{likes?.length} likes</p>
                      </div>
                      {comments && comments.length >= 0 && (
                        <div className="pe-2">
                          <p>{comments?.length} comments</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="deletePost2">
                    {user && user.uid === userId && (
                      <DeleteBlogPost id={id} imageUrl={file} />
                    )}
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div>
    </>
  );
}
