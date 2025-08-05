import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const API_BASE = "https://playground.4geeks.com/todo";
const USERNAME = "VTae";

const Home = () => {
  const [tarea, setTarea] = useState("");
  const [lista, setLista] = useState([]);

  // Crear usuario si no existe
  const crearUsuario = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/${USERNAME}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });

      if (res.ok || res.status === 400) {
        console.log("Usuario listo");
      } else {
        console.error("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error de red al crear usuario:", error);
    }
  };

  // Obtener tareas desde el backend
  const obtenerTareas = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/${USERNAME}`); // ✅ endpoint correcto
      if (res.ok) {
        const data = await res.json();
        setLista(data.todos || []);
      } else {
        console.error("Error al obtener tareas");
      }
    } catch (error) {
      console.error("Error de red al obtener tareas:", error);
    }
  };

  // Agregar tarea con POST
  const agregarTarea = async (e) => {
    if (e.key === "Enter" && tarea.trim() !== "") {
      const nuevaTarea = {
        label: tarea.trim(),
        is_done: false,
      };

      fetch(`${API_BASE}/todos/${USERNAME}`, {
        method: "POST",
        body: JSON.stringify(nuevaTarea),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          console.log("Tarea agregada:", data);
          setTarea("");
          obtenerTareas(); // Recargar lista
        })
        .catch((error) => {
          console.error("Error al agregar tarea:", error);
        });
    }
  };

  // Eliminar tarea individual por ID
  const eliminarTarea = async (index) => {
    const tareaAEliminar = lista[index];
    if (!tareaAEliminar || !tareaAEliminar.id) return;

    try {
      const res = await fetch(`${API_BASE}/todos/${tareaAEliminar.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Tarea eliminada");
        obtenerTareas();
      } else {
        console.error("Error al eliminar tarea");
      }
    } catch (error) {
      console.error("Error de red al eliminar tarea:", error);
    }
  };

  // Limpiar toda la lista del backend
  const limpiarTareas = async () => {
    try {
      const res = await fetch(`${API_BASE}/users/${USERNAME}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLista([]);
        console.log("Lista limpia");
      } else {
        console.error("Error al limpiar tareas");
      }
    } catch (error) {
      console.error("Error al limpiar tareas:", error);
    }
  };

  // Crear usuario y cargar lista al iniciar
  useEffect(() => {
    crearUsuario().then(obtenerTareas);
  }, []);

  return (
    <div className="container">
      <h1 className="Titulo">Lista de Tareas</h1>

      <input
        type="text"
        placeholder="¿Qué necesitas hacer?"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyDown={agregarTarea}
        className="input"
      />

      <div className="lista">
        {lista.map((item, index) => (
          <div key={item.id || index} className="todo-item">
            <div className="text">{item.label}</div>
            <div className="delete-btn" onClick={() => eliminarTarea(index)}>
              ✖
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        {lista.length} {lista.length === 1 ? "tarea" : "tareas"} restantes
        <button className="clear-btn" onClick={limpiarTareas}>
          Eliminar todas las tareas
        </button>
      </div>
    </div>
  );
};

export default Home;