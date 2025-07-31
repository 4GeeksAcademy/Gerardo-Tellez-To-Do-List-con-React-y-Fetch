import React, { useState } from "react";

const Home = () => {
  const [texto, setTexto] = useState('');
  const [tareas, setTareas] = useState([]);

  const manejarCambio = (e) => {
    setTexto(e.target.value);
  };

  const manejarKeyDown = (e) => {
    if (e.key === 'Enter' && texto.trim() !== '') {
      setTareas([...tareas, texto]);
      setTexto('');
    }
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div className="text-center mt-5">
      <h1>To do list with React</h1>

      <input
        type="text"
        placeholder="Escribe una tarea y presiona Enter"
        value={texto}
        onChange={manejarCambio}
        onKeyDown={manejarKeyDown}
        className="input"
      />

      <ul className="lista">
        {tareas.length === 0 ? (
          <li className="mensaje-vacio">No hay tareas, añadir tareas</li>
        ) : (
          tareas.map((tarea, index) => (
            <li key={index} className="tarea-item">
              {tarea}
              <button className="eliminar" onClick={() => eliminarTarea(index)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
