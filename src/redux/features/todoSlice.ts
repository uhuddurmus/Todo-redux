import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const initialState: Todo[] = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos")!)
  : [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newTodo = { id: v4(), title: action.payload, completed: false };
      state.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    remove: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const updatedState = state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    editTodoTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
        localStorage.setItem("todos", JSON.stringify(state));
      }
    },
  },
});

export default todoSlice.reducer;

export const { add, remove, toggleCompleted, editTodoTitle } = todoSlice.actions;
