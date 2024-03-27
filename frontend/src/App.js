import React, { useState } from "react";
import "./App.scss";

function App() {
  const mockData = [
    {
      id: 1,
      done: true,
      title: "Buy milk",
      details: "1l of milk",
      created: "2024-02-20:10-23-56",
      edited: "2024-02-20:11-11-11",
    },
    {
      id: 2,
      done: false,
      title: "Buy cookies",
      details: "6 chocolate chip cookies",
      created: "2024-02-20:10-33-56",
      edited: "2024-02-20:10-33-56",
    },
    {
      id: 3,
      done: false,
      title: "Eat milk and cookies",
      details: "Yum!",
      created: "2024-02-20:10-43-56",
      edited: "2024-02-20:10-33-56",
    },
  ];

  const [data, setData] = useState(
    mockData.map((item) => ({
      ...item,
      editing: false,
    })),
  );

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
    e.preventDefault();
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
    // Replace with BE action and reload
    setData(
      data.map((item) => (item.id === id ? { ...item, editing: false } : item)),
    );
  };

  const getNewId = (id) => {
    // This will come from BE
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
      data.forEach((item) => {
        newData.push(item);
        if (item.id === id) newData.push({ ...item, id: getNewId(id) });
      });
      setData(newData);
    }
  };

  const deleteTodo = (id, e) => {
    e.preventDefault();
    console.log("delete", id);
    if (
      window.confirm(
        `"${getTodo(id).title}" Are you sure you want to delete this todo?`,
      ) === true
    ) {
      // Replace with BE action and reload
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TODO LIST</h1>
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
                      value={item.details}
                      onChange={(e) => editDetails(item.id, e)}
                    ></textarea>
                  ) : (
                    <p>{item.details}</p>
                  )}
                </fieldset>

                <fieldset className="dates">
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

                <fieldset>
                  {item.editing ? (
                    <button onClick={(e) => saveTodo(item.id, e)}>Save</button>
                  ) : (
                    <button onClick={(e) => editTodo(item.id, e)}>Edit</button>
                  )}

                  <button
                    onClick={(e) => duplicateTodo(item.id, e)}
                    disabled={item.editing}
                  >
                    Duplicate
                  </button>

                  <button
                    onClick={(e) => deleteTodo(item.id, e)}
                    disabled={item.editing}
                  >
                    Delete
                  </button>
                </fieldset>
              </form>
            </li>
          ))}
        </ol>
      </main>
      <footer>© Colibri Digital 2024</footer>
    </div>
  );
}

export default App;
