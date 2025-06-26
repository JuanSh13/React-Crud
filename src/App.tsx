import { useState } from "react";
import { createItem } from "./services/Api";

const App = () => {
  const [title, setTitle] = useState("");
  return (
    <>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title:"
      />
      <button onClick={() => createItem({ title: title })}>Crear</button>
    </>
  );
};

export default App;
