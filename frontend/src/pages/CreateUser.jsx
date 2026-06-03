import { useState } from "react";
import api from "../services/api";
import "./CreateUser.css";

function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const createUser = async (e) => {
    e.preventDefault();

    const userData = {
      fullName: user.name,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      address: user.address
    };

    try {
      await api.post("/api/users", userData);
      setMessage("Customer created successfully!");

      setUser({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Failed to create customer.");
    }
  };

  return (
    <div className="customer-wrapper">
      <div className="customer-info">
        <h3>Join the ChaiKafe Family</h3>
        <p>
          Create your customer account to order your favorite chai, snacks,
          and café combos quickly.
        </p>

        <div className="benefits">
          <span>☕ Fast ordering</span>
          <span>🛒 Easy cart management</span>
          <span>🚀 Real-time backend API</span>
        </div>
      </div>

      <form className="customer-form" onSubmit={createUser}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={user.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={user.address}
          onChange={handleChange}
        />

        <button type="submit">Create Customer</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default CreateUser;
