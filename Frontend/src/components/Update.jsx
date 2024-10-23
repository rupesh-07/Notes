import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import BackButton from "./BackButton";

export const Update = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        // const response = await axios.get(`http://localhost:5000/notes/${id}`);
        const response = await axios.get(
          `https://notes-a5k0.onrender.com/notes/${id}`
        );
        const note = response.data.note;
        setText(note.text);
        setCategory(note.category);
      } catch (error) {
        setError("Failed to fetch note: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { text, category };
      // const response = await axios.put(
      //   `http://localhost:5000/notes/${id}`,
      //   data
      // );
      const response = await axios.put(
        `https://notes-a5k0.onrender.com/notes/${id}`,
        data
      );
      toast.success("Note Updated Successfully");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
        // console.log(error.response);
      } else {
        setError("Failed to update note. Please try again.");
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
        <h2>Update Your Note</h2>

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
