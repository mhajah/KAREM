import { useEffect, useState } from "react";

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5175/get_users");
    const data = await response.json();
    setUsers(data.map((user: { name: string }) => user.name));
  };

  const addUser = async () => {
    await fetch("http://localhost:5175/add_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista użytkowników</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Podaj nazwę"
      />
      <button onClick={addUser}>Dodaj użytkownika</button>
    </div>
  );
}

export default UsersView;