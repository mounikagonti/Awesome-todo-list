import {Provider} from 'react-redux'
import {store} from './redux/store'
import TodoList from './components/TodoList'

function App() {
  return (
    <Provider store={store}>
      <div className='min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
        <div className='container mx-auto p-4 sm:p-6 lg:p-8'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-6 text-white text-center'>
            Awesome Todo List
          </h1>
          <TodoList />
        </div>
      </div>
    </Provider>
  )
}

export default App
