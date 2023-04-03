import "./Track.css";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Ticket from "../Ticket/Ticket";
import { Link } from "react-router-dom";

const Track = ({ user }) => {
  const [ecs, setEcs] = useState([]);
  const [issues, setIssues] = useState([]);

  // current userIds on the system at this moment.
  const userIds = {
    admin: "4zghS1LYpYP17yOVl2FbSXVKM9e2",
    nonAdmin1: "4KuBZleUt8WhPzraNtIPDahPfDg2",
    nonAdmin2: "HWVsadVImBYmseRBooMiF5HCeYk2",
  };

  // if user is an admin, give admin access to all submitted ecs and issues that are on the system. if user isn't an admin, users only get access to their tickets they created.
  useEffect(() => {
    if (user?.uid === userIds.admin) {
      const adminRef = collection(
        db,
        `users/${Object.values(userIds)[0]}/ec's`
      );
      const adminRefSubmittedEcs = query(
        adminRef,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(adminRefSubmittedEcs, (snapshot) => {
        const ecsToAdd = snapshot.docs.map((doc) => ({
          user: userIds.admin,
          id: doc.id,
          data: doc.data(),
        }));

        setEcs((prevEcs) => {
          const removeDuplicates = new Map(
            [...prevEcs, ...ecsToAdd].map((ec) => [ec.id, ec])
          );

          return Array.from(removeDuplicates.values());
        });
      });

      const nonAdminRef = collection(
        db,
        `users/${Object.values(userIds)[1]}/ec's`
      );
      const nonAdminSubmittedEcs = query(
        nonAdminRef,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(nonAdminSubmittedEcs, (snapshot) => {
        const ecsToAdd = snapshot.docs.map((doc) => ({
          user: userIds.nonAdmin1,
          id: doc.id,
          data: doc.data(),
        }));

        setEcs((prevEcs) => {
          const removeDuplicates = new Map(
            [...prevEcs, ...ecsToAdd].map((ec) => [ec.id, ec])
          );

          return Array.from(removeDuplicates.values());
        });
      });

      const nonAdmin2Ref = collection(
        db,
        `users/${Object.values(userIds)[2]}/ec's`
      );
      const nonAdmin2SubmittedEcs = query(
        nonAdmin2Ref,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(nonAdmin2SubmittedEcs, (snapshot) => {
        const ecsToAdd = snapshot.docs.map((doc) => ({
          user: userIds.nonAdmin2,
          id: doc.id,
          data: doc.data(),
        }));

        setEcs((prevEcs) => {
          const removeDuplicates = new Map(
            [...prevEcs, ...ecsToAdd].map((ec) => [ec.id, ec])
          );

          return Array.from(removeDuplicates.values());
        });
      });

      const secondAdminRef = collection(db, `users/${userIds.admin}/issues`);
      const adminSubmittedIssues = query(
        secondAdminRef,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(adminSubmittedIssues, (snapshot) => {
        const issuesToAdd = snapshot.docs.map((doc) => ({
          user: userIds.admin,
          id: doc.id,
          data: doc.data(),
        }));

        setIssues((prevIssues) => {
          const removeDuplicates = new Map(
            [...prevIssues, ...issuesToAdd].map((ec) => [ec.id, ec])
          );

          return Array.from(removeDuplicates.values());
        });
      });

      const secondNonAdminRef = collection(
        db,
        `users/${userIds.nonAdmin1}/issues`
      );
      const nonAdminSubmittedIssues = query(
        secondNonAdminRef,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(nonAdminSubmittedIssues, (snapshot) => {
        const issuesToAdd = snapshot.docs.map((doc) => ({
          user: userIds.nonAdmin1,
          id: doc.id,
          data: doc.data(),
        }));

        setIssues((prevIssues) => {
          const removeDuplicates = new Map(
            [...prevIssues, ...issuesToAdd].map((ec) => [ec.id, ec])
          );

          return Array.from(removeDuplicates.values());
        });
      });

      const secondNonAdmin2Ref = collection(
        db,
        `users/${userIds.nonAdmin2}/issues`
      );
      const nonAdmin2SubmittedIssues = query(
        secondNonAdmin2Ref,
        orderBy("dateCreated", "desc")
      );
      onSnapshot(nonAdmin2SubmittedIssues, (snapshot) => {
        const issuesToAdd = snapshot.docs.map((doc) => ({
          user: userIds.nonAdmin2,
          id: doc.id,
          data: doc.data(),
        }));

        setIssues((prevIssues) => {
          const removeDuplicates = new Map(
            [...prevIssues, ...issuesToAdd].map((ec) => [ec.id, ec])
          );

          return Array.from(removeDuplicates.values());
        });
      });
    } else {
      const firstRef = collection(db, `users/${user?.uid}/ec's`);
      const submittedEcs = query(firstRef, orderBy("dateCreated", "desc"));
      onSnapshot(submittedEcs, (snapshot) => {
        setEcs(
          snapshot.docs.map((doc) => ({
            user: user?.uid,
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      const secondRef = collection(db, `users/${user?.uid}/issues`);
      const submittedIssues = query(secondRef, orderBy("dateCreated", "desc"));
      onSnapshot(submittedIssues, (snapshot) => {
        setIssues(
          snapshot.docs.map((doc) => ({
            user: user?.uid,
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="track">
      <Link to="/">Return to Home Page</Link>
      {user?.uid === userIds.admin ? (
        <h1>All Submited Tickets</h1>
      ) : (
        <h1>Your Submitted Tickets</h1>
      )}
      <div className="track__container">
        {ecs.map((ec) => (
          <Ticket key={ec?.id} ticketInfo={ec} isEc={true} user={user} />
        ))}
        {issues.map((issue) => (
          <Ticket key={issue?.id} ticketInfo={issue} isEc={false} user={user} />
        ))}
      </div>
    </div>
  );
};
export default Track;
