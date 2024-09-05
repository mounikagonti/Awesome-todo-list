import { useState } from 'react'

interface TodoItemProps {
  todo: {
    id: string
    text: string
    date: string
    completed: boolean
  }
  onToggle: () => void
  onUpdate: (text: string, date: string) => void
  onDelete: () => void
}

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editDate, setEditDate] = useState(todo.date)

  const handleUpdate = () => {
    onUpdate(editText.trim(), editDate)
    setIsEditing(false)
  }

  return (
    <li className="bg-gray-100 rounded-lg p-4 shadow-md transition duration-300 ease-in-out hover:shadow-lg">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row items-center">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow mb-2 sm:mb-0 sm:mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Edit todo text"
          />
          <input
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            className="mb-2 sm:mb-0 sm:mr-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Edit todo date"
          />
          <div className="flex">
            <button 
              onClick={handleUpdate} 
              className="bg-green-500 text-white p-2 rounded-lg mr-2 hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              aria-label="Save changes"
            >
              Save
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              aria-label="Cancel editing"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={onToggle}
              className="mr-3 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text} - {todo.date}
            </span>
          </div>
          <div className="flex">
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-yellow-500 text-white p-2 rounded-lg mr-2 hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
              aria-label={`Edit "${todo.text}"`}
            >
              Edit
            </button>
            <button 
              onClick={onDelete} 
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label={`Delete "${todo.text}"`}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

export default TodoItem