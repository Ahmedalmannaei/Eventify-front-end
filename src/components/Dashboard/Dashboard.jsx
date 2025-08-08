import { useEffect, useContext } from "react";

import { UserContext } from "../../contexts/UserContext";

// import * as userService from "../../services/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const fetchedUsers = await userService.index();
//         console.log(fetchedUsers);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     if (user) fetchUsers();
//   }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the events.
      </p>
    </main>
  );
};

export default Dashboard;
