// Importación de la Conexión a la base de datos
import { db } from "./firebase";
// Importación de las funcionalidades de Firebase
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
// Type o Interface para los datos recibidos
import type { Task } from "../interfaces/Task";

const tasksRef = collection(db, "tasks");

export const createTask = (task: Task) => addDoc(tasksRef, task);

export const getTasks = () => getDocs(tasksRef);

export const listenTasks = (callback: (tasks: Task[]) => void) => {
  return onSnapshot(tasksRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Task[];
    callback(data);
  });
};

export const updateTask = (id: string, task: Partial<Task>) => {
  const docRef = doc(db, "tasks", id);
  return updateDoc(docRef, task);
};

export const deleteTask = (id: string) => {
  const docRef = doc(db, "tasks", id);
  return deleteDoc(docRef);
};
