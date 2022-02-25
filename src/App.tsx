import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Slider from './pages/Slider';
import TypeList from './pages/TypeList';
import Tabs from './pages/Tabs';
import ListSort from './pages/ListSort';
import Notification from './pages/Notification';
import CardInfo from './pages/CardInfo';
import DragSort from './pages/DragSort';
import HorizontalScroll from './pages/HorizontalScroll';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="slider" element={<Slider />} />
      <Route path="type-list" element={<TypeList />} />
      <Route path="tabs" element={<Tabs />} />
      <Route path="list-sort" element={<ListSort />} />
      <Route path="notification" element={<Notification />} />
      <Route path="card-info" element={<CardInfo />} />
      <Route path="drag-sort" element={<DragSort />} />
      <Route path="horizontal-scroll" element={<HorizontalScroll />} />
    </Routes>
  );
};

export default App;
