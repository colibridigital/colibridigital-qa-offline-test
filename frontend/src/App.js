import React, { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const API = "http://localhost:8000";

  const [data, setData] = useState([]);

  const getTodos = async (props) => {
    try {
      const response = await fetch(`${API}/items/`);

      const data = await response.json();

      let highestId = -1;

      data.forEach((item) => (highestId = Math.max(highestId, item.id)));

      console.log(data);
      if (data) {
        console.log(data);
        setData(
          data.map((item) => ({
            ...item,
            title: props?.editLatest ? "" : item.title,
            details: props?.editLatest ? "" : item.details,
            editing: props?.editLatest ? highestId === item.id : false,
          })),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const getTodo = (id) => {
    return data.find((item) => item.id === id);
  };

  const setDone = (id, e) => {
    console.log("setDone", id, e.target.checked);
    // Replace with BE action and reload
    setData(
      data.map((item) =>
        item.id === id ? { ...item, done: e.target.checked } : item,
      ),
    );
  };

  const editTodo = (id, e) => {
    if (e) e.preventDefault();
    console.log("edit", id);
    setData(
      data.map((item) => (item.id === id ? { ...item, editing: true } : item)),
    );
  };

  const editTitle = (id, e) => {
    e.preventDefault();
    console.log("editTitle", id, e.target.value);
    setData(
      data.map((item) =>
        item.id === id ? { ...item, title: e.target.value } : item,
      ),
    );
  };

  const editDetails = (id, e) => {
    e.preventDefault();
    console.log("editDetails", id, e.target.value);
    setData(
      data.map((item) =>
        item.id === id ? { ...item, details: e.target.value } : item,
      ),
    );
  };

  const saveTodo = (id, e) => {
    e.preventDefault();
    console.log("save", id);

    fetch(`${API}/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: getTodo(id).done,
        title: getTodo(id).title,
        details: getTodo(id).details,
      }),
    }).then(() => {
      getTodos();
    });
  };

  const getNewId = (id) => {
    // This will come from BE
    console.log("getNewId", id);
    return Math.max(...data.map((o) => o.id)) + 1;
  };

  const duplicateTodo = (id, e) => {
    e.preventDefault();
    console.log("duplicate", id);
    if (
      window.confirm(`"${getTodo(id).title}" Duplicate this todo?`) === true
    ) {
      // Replace with BE action and reload
      const newData = [];

      const now = new Date();

      data.forEach((item) => {
        newData.push(item);
        if (item.id === id)
          newData.push({
            ...item,
            id: getNewId(id),
            created: String(now),
            edited: String(now),
          });
      });
      setData(newData);
    }
  };

  const deleteTodo = (id, e) => {
    e.preventDefault();
    fetch(`${API}/items/${id}`, {
      method: "DELETE",
    }).then(() => {
      getTodos();
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    console.log("addTodo");

    fetch(`${API}/items/create/item`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        done: false,
        title: "title",
        details: "details",
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
        <ol>
          {data.map((item, index) => (
            <li key={index}>
              <form className={`title ${item.done && "done"}`}>
                <fieldset className={`title ${item.done && "done"}`}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) => setDone(item.id, e)}
                  ></input>
                  {item.editing ? (
                    <input
                      type="text"
                      placeholder="What should you do?"
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
                      placeholder="Some details..."
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
                    <button onClick={(e) => editTodo(item.id, e)}>Edit</button>
                  )}

                  <button
                    onClick={(e) => duplicateTodo(item.id, e)}
                    disabled={item.editing}
                  >
                    Duplicate
                  </button>

                  <button onClick={(e) => deleteTodo(item.id, e)}>
                    Delete
                  </button>
                </fieldset>
              </form>
            </li>
          ))}
        </ol>
        <button onClick={(e) => addTodo(e)} className="add-todo">
          Add TODO
        </button>
      </main>
      <footer>© Colibri Digital 2024</footer>
    </div>
  );
}

export default App;
