import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [isError, setIsError] = React.useState(false);

  // Check if user already has a token cookie
  React.useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    if (hasToken) {
      navigate("/"); // redirect to homepage if already logged in
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleLogin(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/log-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message);
      setIsError(true);
      return;
    }

    setMessage(data.message);
    setIsError(false);
    if (data.token) {
      document.cookie = `token=${data.token}; max-age=${1 * 24 * 60 * 60}; path=/`;
    }

    setTimeout(() => {
      window.dispatchEvent(new Event("cookieChange"));
      navigate("/");
    }, 500);
  }

  return (
    <div className="container">
      <h1>Log In</h1>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        value={userData.email}
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

      <button type="submit" onClick={handleLogin}>
        Log In
      </button>

      <p className="signup-link">
        Don't have an account?{" "}
        <Link className="link" to="/sign-up">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
