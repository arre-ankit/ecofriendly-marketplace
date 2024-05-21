import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AppBar} from './component/AppBar'
import {SignUp} from './component/SignUp';

function App() {

  return (
      <div>
        <Router>
          <AppBar/>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      
      </div>
  )
}

export default App
