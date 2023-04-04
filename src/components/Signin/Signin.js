import "./Signin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  // handles input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // signs in the user authenticating them using firebase auth, any errors that occur such as wrong information we handle that as well.
  const handleFormSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
        navigate("/");
      })
      .catch((error) => setErrMsg("Invalid Username or Password"));
  };

  return (
    <div className="signin">
      <form className="signin__form" onSubmit={handleFormSubmit}>
        <h3 className="displayError">{errMsg}</h3>
        <h1>Welcome</h1>

        <div>
          <label className="signin__form--label" htmlFor="username">
            Username:
          </label>
          <input
            className="signin__form--input"
            type="text"
            id="username"
            placeholder="Enter username"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <div>
          <label className="signin__form--label" htmlFor="password">
            Password:
          </label>
          <input
            className="signin__form--input"
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};
export default Signin;
