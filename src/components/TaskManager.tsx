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
  const [completed, setCompleted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = listenTasks(setTasks);
    return () => unsub();
  }, []);

  console.log(tasks);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await updateTask(editingId, { title, description });
      setEditingId(null);
    } else {
      await createTask({ title, description, completed });
    }

    setTitle("");
    setDescription("");
    setCompleted(false);
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
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Gestor de Tareas</h2>

      <div className="row">
        {/* Formulario a la Izquierda */}
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {editingId ? "Editar Tarea" : "Nueva Tarea"}
              </h5>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <textarea
                  className="form-control mb-3"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-primary w-100" type="submit">
                  {editingId ? "Actualizar" : "Crear"} Tarea
                </button>
              </form>
            </div>
            <progress value={tasks.length} max={3}></progress>
          </div>
        </div>
        {/* Sección de tareas a la Derecha */}
        <div className="col-lg-8 mb-4">
          <div className="d-flex flex-wrap gap-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`card shadow-sm flex-grow-1 ${
                  task.completed ? "bg-light text-muted" : ""
                }`}
                style={{
                  minWidth: "250px",
                  maxWidth: "300px",
                  opacity: task.completed ? 0.7 : 1,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={task.completed}
                        id={`check-${task.id}`}
                        onChange={() => handleToggleComplete(task.id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`check-${task.completed}`}
                      >
                        Tarea completada
                      </label>
                    </div>

                    <h5 className="card-title">{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                  </div>

                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
