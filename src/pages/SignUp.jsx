
import { useState } from "react";
// import { createConnection } from 'mysql2';
import { promisify } from 'util';

export default function SignUp() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const connection = createConnection({
  //     host: "localhost",
  //     user: "your-mysql-username",
  //     password: "your-mysql-password",
  //     database: "your-mysql-database",
  //   });
  //   const query = promisify(connection.query).bind(connection);
  //   const sql = `INSERT INTO users (firstName, lastName, email, password) VALUES ('${firstName}', '${lastName}', '${email}', '${password}')`;
  //   query(sql)
  //     .then(() => {
  //       console.log("User added successfully");
  //       // Redirect to login page or show success message
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       // Show error message
  //     })
  //     .finally(() => {
  //       connection.end();
  //     });
  // };

  return (
    <div className="flex w-[100vw] md:w-[calc(100vw-18rem)] flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
          <input
            id="firstName"
            type="text"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
          <input
            id="lastName"
            type="text"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline-blue"
        >
          Sign Up
        </button>
        <p className="mt-3">if you have already an acount <a className="c cursor-pointer text-blue-700" href="/login">Login</a></p>
      </form>
    </div>
  );
}
