import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const API = "http://localhost:8000";
  const defaultTitle = "What to do?";
  const defaultDetails = "Details...";

  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTodos = async (editLatest) => {
    try {
      const response = await fetch(`${API}/items/`);

      const responseData = await response.json();

      let highestId = -1;

      responseData.forEach(
        (item) => (highestId = Math.max(highestId, item.id)),
      );

      if (responseData) {
        setData(
          responseData.map((item) =>
            item.id === highestId && editLatest
              ? {
                  title: "",
                  details: "",
                  done: false,
                  editing: true,
                  id: item.id,
                }
              : item,
          ),
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const getTodo = (id) => {
    return data.find((item) => item.id === id);
  };

  const setDone = (id, e) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, done: e.target.checked } : item,
      ),
    );
    saveTodoContent(id, {
      title: getTodo(id).title,
      details: getTodo(id).details,
      done: e.target.checked,
    });
  };

  const editTodo = (id, e) => {
    e.preventDefault();
    setData(
      data.map((item) => (item.id === id ? { ...item, editing: true } : item)),
    );
    setEditing(id);
  };

  const editTitle = (id, e) => {
    e.preventDefault();
    setData(
      data.map((item) =>
        item.id === id ? { ...item, title: e.target.value } : item,
      ),
    );
  };

  const editDetails = (id, e) => {
    e.preventDefault();
    setData(
      data.map((item) =>
        item.id === id ? { ...item, details: e.target.value } : item,
      ),
    );
  };

  const saveTodoContent = (id, content) => {
    setLoading(true);
    fetch(`${API}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    }).then(() => {
      getTodos();
    });
  };

  const saveTodo = (id, e) => {
    e.preventDefault();
    saveTodoContent(id, {
      done: getTodo(id).done,
      title: getTodo(id).title,
      details: getTodo(id).details,
    });
    setEditing(false);
  };

  const duplicateTodo = (id, e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API}/items/duplicate/${id}`, {
      method: "POST",
    }).then(() => {
      getTodos();
    });
  };

  const deleteTodo = (id, e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API}/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      getTodos();
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${API}/items/create/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: false,
        title: defaultTitle,
        details: defaultDetails,
        editing: true,
      }),
    }).then(() => {
      getTodos({ editLatest: true });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          TO DO LIST
          {` ${data.filter((item) => item.done).length}/${data.length}`}
        </h1>
      </header>
      <main>
        <ol className={loading && "loading"}>
          {data.map((item, index) => (
            <li key={index}>
              <form className={`title ${item.done && "done"}`}>
                <fieldset className={`title ${item.done && "done"}`}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) => setDone(item.id, e)}
                    disabled={item.editing || editing}
                  ></input>
                  {item.editing ? (
                    <input
                      type="text"
                      placeholder={defaultTitle}
                      value={item.title}
                      readOnly={!item.editing}
                      onChange={(e) => editTitle(item.id, e)}
                    ></input>
                  ) : (
                    <span>{item.title}</span>
                  )}
                </fieldset>

                <fieldset className="details">
                  {item.editing ? (
                    <textarea
                      placeholder={defaultDetails}
                      value={item.details}
                      onChange={(e) => editDetails(item.id, e)}
                    ></textarea>
                  ) : (
                    <p style={item.details ? { opacity: 1 } : { opacity: 0.4 }}>
                      {item.details || "(no details)"}
                    </p>
                  )}
                </fieldset>

                <fieldset className="dates responsive">
                  <p>
                    <span>ID: </span>
                    <span>{item.id}</span>
                  </p>
                  <p>
                    <span>Created: </span>
                    <span>{item.created}</span>
                  </p>
                  <p>
                    <span>Edited: </span>
                    <span>{item.edited}</span>
                  </p>
                </fieldset>

                <fieldset className="buttons responsive">
                  {item.editing ? (
                    <button
                      onClick={(e) => saveTodo(item.id, e)}
                      disabled={!item.title}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={(e) => editTodo(item.id, e)}
                      disabled={editing !== false && item.id !== editing}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={(e) => duplicateTodo(item.id, e)}
                    disabled={editing}
                  >
                    Duplicate
                  </button>

                  <button
                    onClick={(e) => deleteTodo(item.id, e)}
                    disabled={editing && item.id !== editing}
                  >
                    Delete
                  </button>
                </fieldset>
              </form>
            </li>
          ))}
        </ol>
        <button
          onClick={(e) => addTodo(e)}
          className="add-todo"
          disabled={loading}
        >
          Add TODO
        </button>
      </main>
      <footer>© Colibri Digital 2024</footer>
    </div>
  );
}

export default App;
