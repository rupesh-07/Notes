import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import BackButton from "./BackButton";

export const Create = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { text, category };
      const response = await axios.post(
        `https://notes-backend-1g8j.onrender.com/notes`,
        data
      );

      toast.success("Note Created Successfully");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        // console.log(error.response);
      } else {
        setError("Failed to create note. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const charCount = text.length;

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
      <div className="create-container">
        <h2>Create Your Note</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="text">Write your note here:</label>
            <input
              type="text"
              value={text}
              id="text"
              onChange={(e) => setText(e.target.value)}
              required
              placeholder="Type your note here..."
              maxLength="200"
            />

            <p className="char-count">{charCount}/200</p>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              className="category-select"
              value={category}
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};
