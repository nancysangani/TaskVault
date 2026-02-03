import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [login, setLogin] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkToken = () => {
      const hasToken = document.cookie
        .split("; ")
        .some((c) => c.startsWith("token="));
      setLogin(hasToken);
    };

    // Check once on mount
    checkToken();

    // Listen for cookie changes
    window.addEventListener("cookieChange", checkToken);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("cookieChange", checkToken);
    };
  }, []);

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setLogin(false);
    navigate("/log-in", { replace: true });
  };

  return (
    <>
      <nav>
        <div className="logo">TaskVault</div>
        <ul>
          {login && (
            <>
              <li>
                <Link to="/">Tasks List</Link>
              </li>
              <li>
                <Link to="/add-task">Add Task</Link>
              </li>
              <li>
                <Link to="/log-in" onClick={logout}>
                  Log Out
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <hr />
    </>
  );
}
