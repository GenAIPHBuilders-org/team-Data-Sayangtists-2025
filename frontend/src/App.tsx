import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import JournalList from './pages/JournalList';
import JournalEntry from './pages/JournalEntry';
import Recommendations from './pages/Recommendations'; // Assuming separate page for now

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Basic Navigation Links */}
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Journal List</Link>
          <Link to="/entry" style={{ marginRight: '10px' }}>New Entry</Link>
          {/* Link to Recommendations might be triggered differently later, but keep for testing */}
          <Link to="/recommendations">Recommendations (Test)</Link>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<JournalList />} />
          <Route path="/entry" element={<JournalEntry />} />
          <Route path="/recommendations" element={<Recommendations />} />
          {/* Add more routes as needed, e.g., for viewing/editing specific entries */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
