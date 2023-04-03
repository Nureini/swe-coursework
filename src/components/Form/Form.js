import "./Form.css";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { nanoid } from "nanoid";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import Confirmation from "../Confirmation/Confirmation";

const Form = ({ ecPage, issuePage, user }) => {
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // handles input changes
  const handleDepartmentChange = (e) => setDepartment(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // handles when button is clicked store information of ticket in database
  const handleSubmit = async () => {
    setLoading(true);

    // depending on type of ticket being submitted, whether its ec or an issue ticket, data will be stored in the database according to the type of ticket created.
    if (ecPage) {
      const ref = doc(db, `users/${user?.uid}/ec's/${nanoid()}`);
      await setDoc(ref, {
        department: department,
        description: description,
        dateCreated: new Date(),
        completed: false,
      });
    } else if (issuePage) {
      const ref = doc(db, "users", user?.uid, "issues", nanoid());
      await setDoc(ref, {
        department: department,
        description: description,
        dateCreated: new Date(),
        completed: false,
      });
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (loading) return <p>Submitting Form...</p>;

  if (submitted) return <Confirmation />;

  return (
    <div className="form">
      <Link to={"/"}>Return to Home Page</Link>

      {ecPage && <h1>Submit an EC</h1>}
      {issuePage && <h1>Report Issue</h1>}

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

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Form;
