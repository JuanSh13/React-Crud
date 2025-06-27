// src/components/TaskManager.tsx
import React, { useEffect, useState } from "react";
import type { Task } from "../interfaces/Task";
import {
  createTask,
  deleteTask,
  listenTasks,
  updateTask,
} from "../services/taskService";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = listenTasks(setTasks);
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await updateTask(editingId, { title, description });
      setEditingId(null);
    } else {
      await createTask({ title, description });
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task.id!);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Gestor de Tareas</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          {editingId ? "Actualizar" : "Crear"} Tarea
        </button>
      </form>

      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item" key={task.id}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(task)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(task.id!)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
