import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/users`);
    setUsers(res.data);
  };

  const addUser = async () => {
    if (!name.trim()) return alert("Please enter name");

    await axios.post(`${API_URL}/users`, { name });
    setName("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/users/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>User CRUD App</h1>
        <p style={styles.subtitle}>NubeEra Technologies Pvt Ltd</p>

        <div style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button style={styles.button} onClick={addUser}>
            Add User
          </button>
        </div>

        <h2 style={styles.heading}>User List</h2>

        <div style={styles.list}>
          {users.length === 0 ? (
            <p style={styles.empty}>No users found</p>
          ) : (
            users.map((user) => (
              <div key={user.id} style={styles.userItem}>
                <div style={styles.userLeft}>
                  <span style={styles.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>

                  <div>
                    <strong>{user.name}</strong>
                    <p style={styles.id}>User ID: {user.id}</p>
                  </div>
                </div>

                <button
                  style={styles.deleteButton}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "620px",
    background: "#ffffff",
    padding: "45px",
    borderRadius: "18px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  title: {
    margin: "0",
    fontSize: "38px",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    fontSize: "20px",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
  },
  input: {
    flex: 1,
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "18px",
  },
  button: {
    padding: "16px 24px",
    border: "none",
    borderRadius: "10px",
    background: "#667eea",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  userItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    background: "#f5f7ff",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e2e6ff",
  },
  userLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#667eea",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "22px",
  },
  id: {
    margin: "5px 0 0",
    color: "#777",
    fontSize: "16px",
  },
  deleteButton: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "11px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontSize: "18px",
  },
};

export default App;
