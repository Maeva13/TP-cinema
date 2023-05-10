import { Link, Routes , Route } from 'react-router-dom';
import Appli from './components/Pokemon';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/pokemon' element={<Appli />} />
      </Routes>
    </div>
  );
}

export default App;
