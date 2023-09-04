import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../firebaseconfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function LikeBlogPost({ id, likes }) {
  const [user] = useAuthState(auth);

  const likesRef = doc(database, "Articles", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      <i
        className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""} fa-lg`}
        style={{
          cursor: "pointer",
          marginLeft: "0%",
          color: likes?.includes(user.uid) ? "red" : null,
        }}
        onClick={handleLike}
      />
    </div>
  );
}
