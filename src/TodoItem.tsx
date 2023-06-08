import React from "react";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

interface TodoItemProps {
  todo: Todo;
  editingId: string;
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  handleEditKeyPress: (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    newTitle: string
  ) => void;
  removeIt: (id: string) => void;
  toggle: (id: string) => void;
  startEditing: (id: string, title: string) => void;
  cancelEditing: () => void;
  saveTitle: (id: string, newTitle: string) => void;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editingId,
  editTitle,
  setEditTitle,
  handleEditKeyPress,
  removeIt,
  toggle,
  startEditing,
  cancelEditing,
  saveTitle,
}) => {
  return (
    <div key={todo.id} className="m-2 d-flex align-items-center">
      {editingId === todo.id ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveTitle(todo.id, editTitle);
          }}
          className="d-flex align-items-center"
        >
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.currentTarget.value)}
            onKeyPress={(e) =>
              handleEditKeyPress(e, todo.id, editTitle)
            }
            type="text"
            className="form-control me-2"
          />
          <button
            type="submit"
            className="btn btn-primary me-2"
          >
            <CheckIcon />
          </button>
          <button
            onClick={cancelEditing}
            className="btn btn-secondary"
          >
            <HourglassEmptyIcon />
          </button>
        </form>
      ) : (
        <>
          <button
            onClick={() => removeIt(todo.id)}
            className="btn btn-danger me-2"
          >
            <DeleteIcon />
          </button>
          <div style={{overflow:'scroll'}}>{todo.title}</div>
          <button
            onClick={() => toggle(todo.id)}
            className="btn btn-primary ms-auto"
          >
            {todo.completed ? (
              <Tooltip title="On Progress">
                <HourglassEmptyIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Done">
                <CheckIcon />
              </Tooltip>
            )}
          </button>
          <button
            onClick={() => startEditing(todo.id, todo.title)}
            className="btn btn-secondary ms-2"
          >
            <EditIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
