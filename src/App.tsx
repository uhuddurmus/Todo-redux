import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store/store";
import {
  add,
  remove,
  toggleCompleted,
  editTodoTitle,
} from "./redux/features/todoSlice";
import "./app.css";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileImage from "./components/ProfileImage";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components//TodoItem";

function App() {
  const todos = useAppSelector((state) => state.todos);
  const [addTitle, setAddTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editingId, setEditingId] = useState("");

  const dispatch = useAppDispatch();

  const onSave = () => {
    if (addTitle.trim() !== "") {
      dispatch(add(addTitle));
      setAddTitle("");
    }
  };

  const removeIt = (id: string) => {
    dispatch(remove(id));
  };

  const toggle = (id: string) => {
    dispatch(toggleCompleted(id));
  };

  const startEditing = (id: string, title: string) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const cancelEditing = () => {
    setEditingId("");
    setEditTitle("");
  };

  const saveTitle = (id: string, newTitle: string) => {
    dispatch(editTodoTitle({ id, title: newTitle }));
    setEditingId("");
    setEditTitle("");
  };

  const handleAddKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave();
    }
  };

  const handleEditKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    newTitle: string
  ) => {
    if (e.key === "Enter") {
      saveTitle(id, newTitle);
    }
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src =
      "https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=pexels-felix-mittermeier-956999.jpg&fm=jpg";
    image.onload = () => {
      setLoaded(true);
    };
  }, []);

  return (
    <>
      <div
        className={
          loaded == false
            ? "d-none"
            : "d-flex align-items-center justify-content-center min-vh-100"
        }
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=pexels-felix-mittermeier-956999.jpg&fm=jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container row justify-content-center">
          <div className="col-md-6">
            <ProfileImage
              profileImageUrl="https://avatars.githubusercontent.com/u/74601877?v=4"
              githubUrl="https://github.com/uhuddurmus"
            />
            <TodoInput
              addTitle={addTitle}
              setAddTitle={setAddTitle}
              onSave={onSave}
              handleAddKeyPress={handleAddKeyPress}
            />
            <div
              className="bg-white rounded rounded-3 bg-opacity-75 rounded-5 p-2 "
              style={{ overflowY: "auto", height: "40vh" }}
            >
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  editingId={editingId}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  handleEditKeyPress={handleEditKeyPress}
                  removeIt={removeIt}
                  toggle={toggle}
                  startEditing={startEditing}
                  cancelEditing={cancelEditing}
                  saveTitle={saveTitle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={loaded == true ? "d-none" : ""}>
        <div
          className={
            loaded == true
              ? "d-none"
              : "d-flex align-items-center justify-content-center min-vh-100"
          }
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 d-flex justify-content-center mt-20">
                <CircularProgress size={"40vh"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
