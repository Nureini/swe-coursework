import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { db } from "../../firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { EMPTY_EC, EMPTY_ISSUE } from "../../constants";
import Confirmation from "../Confirmation/Confirmation";

// props ecPage -> if an ec ticket is being edited this will be true otherwise false, issuePage -> if an issue ticket is being edited this will be true otherwise false, user -> needed for when updating user collection in database
const EditForm = ({ ecPage, issuePage, user }) => {
  const [submitted, setSubmitted] = useState(false);
  const [{ ec, issue }, dispatch] = useStateValue();

  useEffect(() => {
    ecPage &&
      dispatch({
        type: EMPTY_ISSUE,
      });
    issuePage &&
      dispatch({
        type: EMPTY_EC,
      });

    //eslint-disable-next-line
  }, []);

  // check if ec ticket or issue ticket then assigns the department getting the values from react context api
  const [department, setDepartment] = useState(
    ecPage ? ec[ec.length - 1]?.department : issue[issue.length - 1]?.department
  );

  // check if ec ticket or issue ticket then assigns the description getting the values from react context api
  const [description, setDescription] = useState(
    ecPage
      ? ec[ec.length - 1]?.description
      : issue[issue.length - 1]?.description
  );

  // we used this state to check if the page hasn't finished loading so we can render a loading message to the screen for the user
  const [loading, setLoading] = useState(false);

  // use to handle input values
  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // used to handle when button is clicked, updates information in the database for users ticket that they edited
  const handleSubmit = async () => {
    setLoading(true);
    if (ecPage) {
      const ecRef = doc(
        collection(db, `users/${user?.uid}/ec's`),
        ec[ec.length - 1].id
      );
      updateDoc(ecRef, { department: department, description: description });
    } else {
      const issueRef = doc(
        collection(db, `users/${user?.uid}/issues`),
        issue[issue.length - 1].id
      );
      updateDoc(issueRef, {
        department: department,
        description: description,
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (loading) return <p>Updating Form...</p>;

  // once submitted we display a confirmation message, the prop editPage is just used so we can render something different on screen if a ticket was edited.
  if (submitted) return <Confirmation editPage={true} />;

  //if some sort of error has happened where the reducer is unable to find ticket information then it will ask user to return and try again.
  if (!ec.length && !issue.length) {
    return (
      <div className="form">
        <Link to={"/track-tickets"}>Return to Tickets Page and Try Again</Link>
      </div>
    );
  }

  return (
    <div className="form">
      <Link to={"/track-tickets"}>Return to Tickets Page</Link>

      {ecPage && <h1>Update EC</h1>}
      {issuePage && <h1>Update Issue</h1>}

      <div className="form__select">
        <select
          name="department"
          id="department"
          defaultValue={department}
          onChange={handleDepartmentChange}
        >
          <option value="" disabled>
            Select a Department
          </option>
          <option value="ITS">ITS</option>
          <option value="EE">EE</option>
          <option value="ITL">ITL</option>
        </select>
      </div>

      <div className="form__description">
        <textarea
          name="description"
          id="description"
          cols="50"
          rows="10"
          placeholder="Please explain further..."
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      <button onClick={handleSubmit}>Update</button>
    </div>
  );
};

export default EditForm;
