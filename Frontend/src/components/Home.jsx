import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReadme } from "@fortawesome/free-brands-svg-icons";
import {
  faCirclePlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/notes`);
        const response = await axios.get(
          `https://notes-backend-z097.onrender.com/notes`
        );
        setNotes(response.data.notes);
      } catch (error) {
        setError("Failed to fetch notes: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

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
    <div>
      <h1 className="notes-title">Notes</h1>
      <div className="create-btn-container">
        <Link to={`/notes/create`} title="Create" className="create-note-btn">
          Create a Note: &nbsp;
          <FontAwesomeIcon icon={faCirclePlus} />
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="no-notes">No Notes Found. Time to create some!</div>
      ) : (
        <div className="notes-container">
          {notes.map((note) => (
            <div key={note._id} className="note-item">
              <p>{note.text}</p>

              <div className="note-actions">
                <Link to={`/notes/read/${note._id}`} title="Read">
                  <FontAwesomeIcon icon={faReadme} />
                </Link>
                <Link to={`/notes/update/${note._id}`} title="Update">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <Link to={`/notes/delete/${note._id}`} title="Delete">
                  <FontAwesomeIcon icon={faTrash} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
