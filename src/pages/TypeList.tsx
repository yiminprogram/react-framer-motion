import { useState, useEffect } from 'react';
import foods from 'src/assets/food.json';
import { TFood } from 'src/types';
import { motion } from 'framer-motion';

type TSort = 'all' | 'price' | 'stars';
const sortItem = ['all', 'price', 'stars'];

const Button = ({
  type,
  changeType,
}: {
  type: string;
  changeType: () => void;
}) => {
  return (
    <button
      onClick={changeType}
      className="py-3 px-6 bg-indigo-600 text-white rounded hover:bg-indigo-500"
      key={type}
    >
      {type}
    </button>
  );
};

const Card = ({ name, image }: TFood) => {
  return (
    <motion.li layout>
      <article className="w-full h-full rounded-md overflow-hidden shadow shadow-gray-400">
        <img className="w-full h-72 object-cover" src={image} />
        <h2 className="p-2">{name}</h2>
      </article>
    </motion.li>
  );
};

const TypeList = () => {
  const [data, setData] = useState<TFood[]>([]);
  const [current, setCurrent] = useState<TSort>('all');
  const [filterList, setFilterList] = useState<TFood[]>([]);

  useEffect(() => {
    setData(foods);
    setFilterList(foods);
  }, []);

  useEffect(() => {
    if (current === 'all') {
      setFilterList(foods);
    } else {
      const value = [...data].sort((a, b) => b[current] - a[current]);
      setFilterList(value);
    }
  }, [current]);

  const changeType = (type: TSort) => {
    console.log(type);
    setCurrent(type);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="pb-8 flex justify-center gap-5">
        {sortItem.map((ele) => (
          <Button
            key={ele}
            type={ele}
            changeType={() => changeType(ele as TSort)}
          />
        ))}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterList.map((ele) => (
          <Card key={ele.name} {...ele} />
        ))}
      </ul>
    </div>
  );
};

export default TypeList;
