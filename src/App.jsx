import './base.module.scss'
import './reset.module.scss'
import CollectPage from './pages/CollectPage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SettingPage from './pages/SettingPage'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='search' element={<SearchPage />} />
          <Route path='collect' element={<CollectPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='setting' element={<SettingPage/>}/>
          <Route path='*' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
