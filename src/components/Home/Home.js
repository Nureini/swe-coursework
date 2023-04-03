import "./Home.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  // allows user to signout
  const handleSignOut = () => {
    if (user) {
      auth.signOut();
    }
  };

  const navigate = useNavigate();

  // if your trying to submit an ec ticket, you will get navigated to ec submission page
  const handleEcButton = () => {
    navigate("/ec-submission");
  };

  // if your trying to submit an ec ticket, you will get navigated to issue submission page
  const handleIssueButton = () => {
    navigate("/issue-submission");
  };

  // if your trying to view your tickets submited, you will get navigated to track tickets page
  const handleTrackButton = () => {
    navigate("/track-tickets");
  };

  return (
    <div className="home">
      <div className="home__containerOne">
        <p className="home__containerOne--welcome">
          Welcome <span>{user?.email}</span>
        </p>
        <p className="home__containerOne--logout" onClick={handleSignOut}>
          Logout
        </p>
      </div>

      <div className="home__containerTwo">
        <button onClick={handleEcButton}>Submit an EC</button>
        <button onClick={handleIssueButton}>Report Issue</button>
        <button onClick={handleTrackButton}>Track Tickets</button>
      </div>

      <div className="home__containerThree">
        <h1>FAQs</h1>
        <div className="faq__container">
          <div className="faq">
            <h3>How do i create a ticket?</h3>
            <p>
              Depending on whether you want to create to Submit an EC or Report
              an Issue, click one of the buttons above
            </p>
          </div>
          <div className="faq">
            <h3>What information do i need to provide in the ticket?</h3>
            <p>
              It is very simple you just need to choose which department you
              want to get in contact with and explain what your problem is.
            </p>
          </div>
          <div className="faq">
            <h3>Can I track/edit a ticket?</h3>
            <p>
              If you navigate to the track tickets page, you will have the
              option to edit a ticket and also you can see the status of your
              ticket.
            </p>
          </div>
          <div className="faq">
            <h3>How long will it take to get a reponse?</h3>
            <p>
              This will depend on the availability of the admins and also wait
              times may take longer when there is a high demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
