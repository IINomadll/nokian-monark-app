import userService from "../utils/userService";

const AdminPanel = ({ user }) => {
  const handleLogout = () => {
    userService.remove();
    window.location.href = "/";
  };

  if (!user) {
    // If user is not authenticated, redirect to home
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h1>Admin panel</h1>
      <section>
        <p>
          Logged in as <strong>{user.username}</strong>
        </p>
        <button onClick={handleLogout}>Logout</button>
      </section>
    </>
  );
};

export default AdminPanel;
