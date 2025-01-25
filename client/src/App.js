import {Routes, Route} from 'react-router-dom'
import './App.css';
import Layout from './Layout';
import Home from './Home';
import Player from './Player';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='player' element={<Player />} />
    </Route>
   </Routes>
  );
}

export default App;
