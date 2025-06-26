import { db } from "./firebase";

// Re-exporta funciones de Firestore
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
  addDoc,
  where,
  onSnapshot,
} from "firebase/firestore";

// interface Item {
//   name: string;
//   quantity: number;
//   price: number;
// }

// Nombre de la colección principal
const collectionName: string = "items";

// Convertir un QuerySnapshot a array de objetos con id
export const getArrayFromCollection = (querySnapshot) => {
  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

// Obtener todos los ítems
export const getItems = async () => {
  const colRef = collection(db, collectionName);
  const result = await getDocs(query(colRef));
  return getArrayFromCollection(result);
};

// Crear un documento
export const createItem = async (obj) => {
  const colRef = collection(db, collectionName);
  const data = await addDoc(colRef, obj);
  return data.id;
};

// Actualizar un documento por ID
export const updateItem = async (id: string, obj) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, obj);
};

// Eliminar un documento por ID
export const deleteItem = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};
