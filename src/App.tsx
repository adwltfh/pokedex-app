import { Routes, Route } from 'react-router-dom'
import ListPage from './pages/ListPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
    </Routes>
  )
}

export default App
