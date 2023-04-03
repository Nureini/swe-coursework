import "./Ticket.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { SUBMIT_FOR_UPDATE_EC, SUBMIT_FOR_UPDATE_ISSUE } from "../../constants";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";

const Ticket = ({ ticketInfo, isEc, user }) => {
  const [isCompleted, setIsCompleted] = useState(ticketInfo?.data?.completed);
  const [, dispatch] = useStateValue();

  const navigate = useNavigate();

  // if edit button is clicked then whichever ticket that was clicked, the information of that ticket is stored in the reducer so information can be easily used for ticket to be edited, and user is also navigated to edit ticket page
  const handleEditBtn = () => {
    if (isEc) {
      dispatch({
        type: SUBMIT_FOR_UPDATE_EC,
        info: {
          id: ticketInfo?.id,
          department: ticketInfo?.data?.department,
          description: ticketInfo?.data?.description,
        },
      });
      navigate("/ec-submission/update");
    } else {
      dispatch({
        type: SUBMIT_FOR_UPDATE_ISSUE,
        info: {
          id: ticketInfo?.id,
          department: ticketInfo?.data?.department,
          description: ticketInfo?.data?.description,
        },
      });
      navigate("/issue-submission/update");
    }
  };

  // when a ticket is completed, this button ensures that it is marked as completed, only admin can click this button.
  const handleCompleteBtn = async () => {
    await setIsCompleted((prevState) => !prevState);
    if (isEc) {
      const ecRef = doc(
        collection(db, `users/${ticketInfo?.user}/ec's`),
        ticketInfo?.id
      );
      await updateDoc(ecRef, { completed: isCompleted });
    } else {
      const issueRef = doc(
        collection(db, `users/${ticketInfo?.user}/issues`),
        ticketInfo?.id
      );
      await updateDoc(issueRef, {
        completed: isCompleted,
      });
    }
  };

  return (
    <div className="ticket">
      {isEc ? (
        <p className="ticketType">Ticket Type: EC Submission</p>
      ) : (
        <p className="ticketType">Ticket Type: Issue Report</p>
      )}
      <h3 className="ticket__h3">
        Ticket ID: <span className="ticket__h3--span">{ticketInfo?.id}</span>
      </h3>
      <p className="ticket__userID">User ID: {ticketInfo?.user}</p>
      <p className="ticket__department">
        Department:{" "}
        <span className="ticket__department--span">
          {ticketInfo?.data?.department}
        </span>
      </p>
      <p className="ticket__description">
        Description: {ticketInfo?.data?.description.substring(0, 30).trim()}...
      </p>
      <p
        className={`ticket__status ${
          ticketInfo?.data?.completed ? "complete" : "incomplete"
        }`}
      >
        Status: {ticketInfo?.data?.completed ? "Completed" : "Pending..."}
      </p>
      <div className="ticket__btnContainer">
        <button className="ticket__btn" onClick={handleEditBtn}>
          Edit Ticket
        </button>
        {/* Only admin can click the complete button to make sure ticket is complete */}
        {user?.uid === "4zghS1LYpYP17yOVl2FbSXVKM9e2" && (
          <button className="ticket__btn" onClick={handleCompleteBtn}>
            {ticketInfo?.data.complete ? "Incomplete" : "Complete"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Ticket;
