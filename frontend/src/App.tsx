 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AnalyserPage from './AnalyserPage'
import  HomePage  from './HomePage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyser" element={<AnalyserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App