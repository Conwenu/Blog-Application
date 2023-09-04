import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "./firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { auth } from "./firebaseconfig";
import "./Comments.css";
export default function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(database, "Articles", id);
  useEffect(() => {
    const docRef = doc(database, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === "Enter") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {currentlyLoggedinUser === null ? (
        <div>Please Log In To Comment</div>
      ) : (
        <div>Comments</div>
      )}

      <div className="commentContainer">
        {comments !== null &&
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div className="commentItem" key={commentId}>
              <div className="commentBorder p-2 mt-2 row">
                <div className="col-11">
                  <span
                    className={`badge ${
                      currentlyLoggedinUser === null
                        ? "bg-primary"
                        : user === currentlyLoggedinUser.uid
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    <div className="commentAuthor">{userName}</div>
                  </span>
                  <br />
                  {comment}
                </div>
                <div className="col-1">
                  {currentlyLoggedinUser !== null &&
                    user === currentlyLoggedinUser.uid && (
                      <i
                        className="fa fa-times"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteComment({
                            commentId,
                            user,
                            comment,
                            userName,
                            createdAt,
                          })
                        }
                      ></i>
                    )}
                </div>
              </div>
            </div>
          ))}
        {currentlyLoggedinUser && (
          <>
            <br />
            <textarea
              className="form-control mt-4 mb-5"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Add a comment"
              onKeyUp={(e) => {
                handleChangeComment(e);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
