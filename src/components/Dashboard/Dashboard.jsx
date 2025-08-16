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
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-base-200">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Welcome, {user.username}
        </h1>
        <p className="text-lg text-gray-700">
          With Eventify, you can create your own events, see others' reviews,
          and add comments to events you've attended.
        </p>
      </div>
    </main>
  );
};

export default Dashboard;
