import SortingVisualiser from './pages/SortingVisualiser.tsx';
import SearchVisualiser from './pages/SearchVisualiser.tsx';
import PathfindingVisualiser from './pages/PathfindingVisualiser.tsx';
import GraphVisualiser from './pages/GraphVisualiser.tsx';
import Navbar from './pages/Navbar.tsx';
import NotFoundPage from './pages/404.tsx';
import './styles/main.css';
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<PathfindingVisualiser />} />
          <Route path="/pathfinding" element={<PathfindingVisualiser />} />
          <Route path="/sorting" element={<SortingVisualiser />} />
          <Route path="/search" element={<SearchVisualiser />} />
          <Route path="/graph" element={<GraphVisualiser />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
