import { useState } from "react";
import axios from "axios";
import "./Delete.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import BackButton from "./BackButton";

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://notes-backend-1g8j.onrender.com/notes/${id}`
      );
      toast.success("Note Deleted Successfully");
      navigate("/");
    } catch (error) {
      setError("Failed to delete note: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", fontSize: "2rem", marginTop: "2rem" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", fontSize: "2rem", marginTop: "2rem" }}>
        {error}
      </div>
    );
  }
  return (
    <>
      <BackButton />
      <div className="delete-container">
        <h2>Are You Sure You want to delete this note?</h2>
        <button className="delete-button" onClick={handleDeleteUser}>
          Yes, Delete It.
        </button>
      </div>
    </>
  );
};

export default Delete;
