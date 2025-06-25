import { useEffect, useState } from "react";

function UserForm({ addUser, editingUser, updateUser }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
    } else {
      setName("");
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingUser) {
      updateUser({ ...editingUser, name });
    } else {
      addUser({ name });
    }
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del usuario"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">{editingUser ? "Actualizar" : "Agregar"}</button>
    </form>
  );
}

export default UserForm;
