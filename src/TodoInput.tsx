import React from "react";

interface TodoInputProps {
  addTitle: string;
  setAddTitle: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  handleAddKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({
  addTitle,
  setAddTitle,
  onSave,
  handleAddKeyPress,
}) => {
  return (
    <div className="m-5 ms-0 me-0  card bg-white bg-opacity-75">
      <div className=" d-flex m-2 p-1">
        <input
          name="addTitle"
          value={addTitle}
          onChange={(e) => setAddTitle(e.currentTarget.value)}
          onKeyPress={handleAddKeyPress}
          type="text"
          className="form-control "
          placeholder="Enter a new todo..."
          style={{ backgroundColor: "transparent" }}
        />
        <button onClick={onSave} className="btn btn-primary ms-1">
          Save
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
