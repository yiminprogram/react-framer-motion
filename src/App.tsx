import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Slider from './pages/Slider';
import TypeList from './pages/TypeList';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="slider" element={<Slider />} />
      <Route path="type-list" element={<TypeList />} />
    </Routes>
  );
};

export default App;
