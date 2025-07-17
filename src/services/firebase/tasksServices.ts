import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import type { Task } from "../../types";


export const taskService = {
  async loadTasksFromBd(): Promise<Task[]> {
    const result = await getDocs(collection(db, "tasks"));
    return result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Task)); 
  },

  async addTaskToDb(taskData: Omit<Task, 'id'>): Promise<Task> {
    const result = await addDoc(collection(db, "tasks"), taskData);
    return { ...taskData, id: result.id }
  },

  async updateTaskCompletedDb(task:Task): Promise<void> {
    await updateDoc(doc(db, "tasks", String(task.id)), { completed: task.completed });

  },

  async deleteTaskDb(id: string): Promise<void> {
    await deleteDoc(doc(db, "tasks", id));
  }
};
