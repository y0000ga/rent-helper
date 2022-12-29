import './base.module.scss'
import './reset.module.scss'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import CollectPage from './pages/CollectPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='search' element={<SearchPage />} />
          <Route path='collect' element={<CollectPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
