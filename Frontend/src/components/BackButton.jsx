import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    margin: "1.5rem",
    padding: "8px 15px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <button style={buttonStyle} onClick={() => navigate(-1)}>
      Go Back
    </button>
  );
};

export default BackButton;
