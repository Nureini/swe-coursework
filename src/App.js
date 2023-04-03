import Signin from "./components/Signin/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import Form from "./components/Form/Form";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Track from "./components/Track/Track";
import EditForm from "./components/EditForm/EditForm";

function App() {
  const [user, setUser] = useState(null);

  // When page is first loaded or on refresh checks to see if a user is logged in or not
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* If user is logged in it will display the main page otherwise they will be on the login page -> only once they have logged in they can access other parts of the site */}
          {user ? (
            <>
              <Route index element={<Home user={user} />} />
              <Route path="ec-submission">
                <Route index element={<Form ecPage={true} user={user} />} />
                <Route
                  path="update"
                  element={<EditForm ecPage={true} user={user} />}
                />
              </Route>

              <Route path="issue-submission">
                <Route index element={<Form issuePage={true} user={user} />} />
                <Route
                  path="update"
                  element={<EditForm issuePage={true} user={user} />}
                />
              </Route>

              <Route path="track-tickets" element={<Track user={user} />} />
            </>
          ) : (
            <Route index element={<Signin />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
