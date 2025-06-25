function UserList({ users, deleteUser, editUser }) {
  if (users.length === 0) return <p>No hay usuarios registrados.</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} style={{ margin: "10px 0" }}>
          {user.name}
          <button onClick={() => editUser(user)} style={{ marginLeft: "10px" }}>
            Editar
          </button>
          <button
            onClick={() => deleteUser(user.id)}
            style={{ marginLeft: "5px" }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
