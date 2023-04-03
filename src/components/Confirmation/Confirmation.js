import "./Confirmation.css";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import { Link } from "react-router-dom";

// accepts prop editPage
const Confirmation = ({ editPage }) => {
  return (
    <div className="confirmation">
      {/* if edit Page is true that means user edited a ticket and now they can have the option to return to tickets page. If they just submitted a ticket it they will have an option of going back to home page */}
      {editPage ? (
        <Link to="/track-tickets">Return to Tickets Page</Link>
      ) : (
        <Link to="/">Return to Home Page</Link>
      )}
      <div>
        <h1>Your Request has Succesfully been submitted</h1>
        <p>You should recieve a reply soon</p>
        <CheckCircleOutlineTwoToneIcon
          className="checkbox"
          color="inherit"
          fontSize=""
        />
      </div>
    </div>
  );
};
export default Confirmation;
