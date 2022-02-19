import { Link } from 'react-router-dom';
import list from 'src/assets/data.json';

const Home = () => {
  return (
    <div className="px-2 py-6 min-h-screen bg-gradient-to-br from-sky-600 to-emerald-600">
      <h1 className="text-3xl text-white font-semibold text-center mb-6">
        Framer Motion Components
      </h1>
      <p className="text-xl text-white text-center mb-6">
        Framer Motion Version : 6.2.6
      </p>
      <ul className="max-w-5xl mx-auto py-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {list.map((ele) => (
          <li key={ele.name}>
            <Link
              className="block text-lg font-bold border border-white text-white p-5 rounded-lg hover:bg-white hover:text-gray-700"
              to={ele.link}
            >
              {ele.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
