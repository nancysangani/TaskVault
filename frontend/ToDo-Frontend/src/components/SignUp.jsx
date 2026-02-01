import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const initialFormState = {
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    password: "",
  };
  const [userData, setUserData] = React.useState(initialFormState);
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const hasToken = document.cookie.includes("token=");

    if (hasToken) {
      navigate("/", {
        state: { fromAuthPage: true },
        replace: true,
      });
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSignUp(event) {
    event.preventDefault();

    const users = await fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await users.json();

    console.log(data);

    if (!users.ok) {
      setIsError(true);
      setMessage(data.message);
      setUserData(initialFormState);
      return;
    }

    // Only on success
    setMessage(data.message);
    setIsError(false);
    if (data.token) {
      document.cookie = `token=${data.token}; max-age=${1 * 24 * 60 * 60}; path=/`;
      window.dispatchEvent(new Event("cookieChange"));
    }

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        value={userData.name}
        onChange={handleChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        value={userData.email}
        onChange={handleChange}
      />
      <label htmlFor="address">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        required
        value={userData.address}
        onChange={handleChange}
      />
      <label htmlFor="phoneNo">Phone Number:</label>
      <input
        type="text"
        id="phoneNo"
        name="phoneNo"
        required
        value={userData.phoneNo}
        onChange={handleChange}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        value={userData.password}
        onChange={handleChange}
      />

      {message && (
        <p style={{ color: isError ? "red" : "green", fontSize: "18px" }}>
          {message}
        </p>
      )}

      <button type="submit" onClick={handleSignUp}>
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <Link className="link" to="/log-in">
          Log In
        </Link>
      </p>
    </div>
  );
}
