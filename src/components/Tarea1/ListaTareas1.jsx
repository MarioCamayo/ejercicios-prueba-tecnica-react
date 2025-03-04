/**
 * 📌 Simulación de Prueba Técnica - React Developer Junior
📜 Requerimientos
La empresa te ha pedido que crees una mini aplicación de gestión de tareas (To-Do List) con las siguientes características:

✅ Lista de tareas: Mostrar tareas con opción de completarlas o eliminarlas.
✅ Agregar nueva tarea: Un input para escribir una tarea y un botón para agregarla.
✅ Guardar tareas en localStorage: Al recargar la página, las tareas deben mantenerse.
✅ Mostrar mensaje si no hay tareas.
✅ Manejo de errores y validaciones:

No permitir tareas vacías.
Evitar agregar tareas duplicadas.
🛠️ Tecnologías permitidas:

React con Hooks (useState, useEffect)
CSS para estilos (opcional, puedes usar Tailwind o CSS puro)
No se permite Redux o librerías externas (solo React puro y localStorage)
 */

import { useState, useEffect } from "react";



function ListaTareas1() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  // Cargar tareas desde localStorage al montar el componente
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) {
      setError("⚠️ La tarea no puede estar vacía.");
      return;
    }
    if (tasks.includes(newTask)) {
      setError("⚠️ Esta tarea ya existe.");
      return;
    }

    setTasks([...tasks, newTask]);
    setNewTask("");
    setError(""); // Limpiar error si se agregó bien
  };

  const removeTask = (taskToRemove) => {
    setTasks(tasks.filter((task) => task !== taskToRemove));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Lista de Tareas 📝</h2>
      <input
        type="text"
        value={newTask}
        placeholder="Nueva tarea..."
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Agregar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {tasks.length === 0 ? (
          <p>No hay tareas pendientes 🎉</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <button onClick={() => removeTask(task)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListaTareas1;
