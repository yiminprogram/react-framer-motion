import { Link } from 'react-router-dom';
import list from 'src/assets/data.json';

const Home = () => {
  return (
    <div className="p-3">
      <h1 className="text-3xl text-indigo-700 font-semibold text-center mb-5">
        Home Page
      </h1>
      <ul className="max-w-4xl mx-auto grid grid-cols-3 gap-3">
        {list.map((ele) => (
          <li key={ele.name}>
            <Link
              className="block border border-gray-300 text-gray-700 p-3 rounded-sm hover:bg-gray-100"
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
