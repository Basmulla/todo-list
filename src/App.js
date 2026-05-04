import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "./firebase";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Tasks from Firebase:", tasksData);
        setTasks(tasksData);
      },
      (error) => {
        console.error("Firebase read error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const addTask = async (task) => {
    await addDoc(collection(db, "tasks"), {
      text: task.text,
      day: task.day,
      reminder: task.reminder,
      createdAt: serverTimestamp(),
    });
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const toggleReminder = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);

    if (!taskToToggle) return;

    await updateDoc(doc(db, "tasks", id), {
      reminder: !taskToToggle.reminder,
    });
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {showAddTask && <AddTask onAdd={addTask} />}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
}

export default App;