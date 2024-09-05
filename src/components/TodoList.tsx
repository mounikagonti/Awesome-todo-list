import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {addTodo, toggleTodo, updateTodo, deleteTodo} from '../redux/todoSlice'
import TodoItem from './TodoItem'
import {RootState} from '../redux/store'

const TodoList = () => {
  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const todos = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim() && date) {
      dispatch(addTodo({text: text.trim(), date}))
      setText('')
      setDate('')
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-xl p-6'>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row mb-6'>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add a todo'
          className='flex-grow mb-2 sm:mb-0 sm:mr-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
          aria-label='Todo text'
        />
        <input
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='mb-2 sm:mb-0 sm:mr-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600'
          aria-label='Todo date'
        />
        <button
          type='submit'
          className='bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'
          aria-label='Add todo'
        >
          Add
        </button>
      </form>
      <ul className='space-y-4'>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => dispatch(toggleTodo(todo.id))}
            onUpdate={(text, date) =>
              dispatch(updateTodo({id: todo.id, text, date}))
            }
            onDelete={() => dispatch(deleteTodo(todo.id))}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList
