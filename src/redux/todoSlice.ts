import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface Todo {
  id: string
  text: string
  date: string
  completed: boolean
}

const initialState: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{text: string; date: string}>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        date: action.payload.date,
        completed: false,
      }
      state.push(newTodo)
      localStorage.setItem('todos', JSON.stringify(state))
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
        localStorage.setItem('todos', JSON.stringify(state))
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{id: string; text: string; date: string}>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
        todo.date = action.payload.date
        localStorage.setItem('todos', JSON.stringify(state))
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo) => todo.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(state))
      }
    },
  },
})

export const {addTodo, toggleTodo, updateTodo, deleteTodo} = todoSlice.actions
export default todoSlice.reducer
