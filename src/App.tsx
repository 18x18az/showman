import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App (): JSX.Element {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/admin' element={<div>Admin</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
