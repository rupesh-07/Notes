import { useParams } from "react-router-dom";
import axios from "axios";
import "./Read.css";
import { useEffect, useState } from "react";
import BackButton from "./backButton";

export const Read = () => {
  const { id } = useParams();

  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/notes/${id}`);
        const response = await axios.get(
          `https://notes-a5k0.onrender.com/notes/${id}`
        );
        setNote(response.data.note);
      } catch (error) {
        setError("Failed to fetch note: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

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
      <div className="note-solo-card">
        <h2 className="details-title">Note Details</h2>
        <div className="card-body">
          <p>{note.text}</p>
          <p>Category: {note.category}</p>
        </div>
      </div>
    </>
  );
};
