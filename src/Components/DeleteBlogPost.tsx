import { deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database, storage } from "./firebaseconfig";
import { deleteObject, ref } from "firebase/storage";
export default function DeleteBlogPost({ id, imageUrl }) {
  let navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(database, "Articles", id));
        console.log("Deleted Successfully");
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
        navigate("/home");
      } catch (error) {
        console.log("Error deleting");
        console.log(error);
      }
    }
  };
  return (
    <div className="holder">
      <i
        className="fa deletePost"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      >
        {"X"}
      </i>
    </div>
  );
}
