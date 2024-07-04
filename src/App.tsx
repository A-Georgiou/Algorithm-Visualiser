import SortingVisualiser from './pages/SortingVisualiser.tsx';
import SearchVisualiser from './pages/SearchVisualiser.tsx';
import PathfindingVisualiser from './pages/PathfindingVisualiser.tsx';
import GraphVisualiser from './pages/GraphVisualiser.tsx';
import Navbar from './pages/Navbar.tsx';
import NotFoundPage from './pages/404.tsx';
import './styles/main.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<SortingVisualiser />} />
          <Route path="/sorting" element={<SortingVisualiser />} />
          <Route path="/search" element={<SearchVisualiser />} />
          <Route path="/pathfinding" element={<PathfindingVisualiser />} />
          <Route path="/graph" element={<GraphVisualiser />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
  </BrowserRouter>
  )
}

export default App
