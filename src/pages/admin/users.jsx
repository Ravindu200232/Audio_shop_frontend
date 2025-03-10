import axios from "axios";
import { useEffect, useState } from "react";

export default function User() {
  let items = [
    {
      _id: "123131424234",
      email: "john.doe@example.com",
      password: "hashed_password_123",
      role: "customer",
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St, Cityville",
      phone: "+1234567890",
      image:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
    {
      _id: "1231rtert31424234",
      email: "jane.smith@example.com",
      password: "hashed_password_456",
      role: "admin",
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Elm St, Townsville",
      phone: "+0987654321",
      image:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
    {
      _id: "1231asd31424234",
      email: "mike.johnson@example.com",
      password: "hashed_password_789",
      role: "vendor",
      firstName: "Mike",
      lastName: "Johnson",
      address: "789 Oak St, Villagetown",
      phone: "+1122334455",
      image:
        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    },
  ];

  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status == "loading") {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setStatus("error");
        });
    }
  }, []);

  return (
    <div className="w-full h-screen bg-primary">
      {status == "loading" && (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] h-[200px]  rounded-full border-[10px] animate-spin border-b-green-500 flex justify-center items-center">
            <h1 className="text-[20px] animate-ping">Loading</h1>
          </div>
        </div>
      )}

      {status == "success" && (
        <table className="border-2 m-10">
          <thead>
            <tr className="border-2 bg-accent">
              <th className="border-2">ID</th>
              <th className="border-2">Email</th>
              <th className="border-2">role</th>
              <th className="border-2">First Name</th>
              <th className="border-2">Last Name</th>
              <th className="border-2">Address</th>
              <th className="border-2">Phone</th>
              <th className="border-2">Profile</th>
              <th className="border-2">Task</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => (
              <tr key={item._id} className="bg-secondary hover:bg-blue-300">
                <td className="border-2">{item._id}</td>
                <td className="border-2">{item.email}</td>
                <td className="border-2">{item.role}</td>
                <td className="border-2">{item.firstName}</td>
                <td className="border-2">{item.lastName}</td>
                <td className="border-2">{item.address}</td>
                <td className="border-2">{item.phone}</td>
                <td className="border-2">
                  <img
                    src={item.image}
                    className="w-[60px] object-cover rounded-full"
                  ></img>
                </td>

                <td>
                  <button className="h-[30px] w-[70px] bg-accent m-3 rounded-lg text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
