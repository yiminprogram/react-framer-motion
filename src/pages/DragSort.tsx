import { useState, useEffect, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

type TFood = {
  id: number;
  name: string;
  icon: string;
  type: string;
};

type TProps = {
  food: TFood;
  getCurrent: (food: TFood | null) => void;
};

const foodList = [
  { id: 1, name: 'ice cream', icon: '🍦', type: 'dessert' },
  { id: 2, name: 'apple', icon: '🍎', type: 'fruit' },
  { id: 3, name: 'juice', icon: '🧃', type: 'drink' },
  { id: 4, name: 'beer', icon: '🍺', type: 'drink' },
  { id: 5, name: 'chocolate', icon: '🍫', type: 'dessert' },
  { id: 6, name: 'coke', icon: '🥤', type: 'drink' },
  { id: 7, name: 'banana', icon: '🍌', type: 'fruit' },
  { id: 8, name: 'cookie', icon: '🍪', type: 'dessert' },
  { id: 9, name: 'milk', icon: '🥛', type: 'drink' },
];

const Card = memo(({ food, getCurrent }: TProps) => {
  const { name, icon, id } = food;
  return (
    <motion.li
      drag
      layoutId={`card-${id}`}
      dragSnapToOrigin
      onMouseDown={() => getCurrent(food)}
      className="basis-36 h-full hover:cursor-grab active:cursor-grabbing select-none"
    >
      <motion.article
        layoutId={`card-container-${id}`}
        className="w-full h-full bg-white flex justify-center items-center flex-col rounded-md"
      >
        <motion.h3
          layoutId={`card-title-${id}`}
          className="text-md font-bold mb-5 text-gray-700"
        >
          {name}
        </motion.h3>
        <motion.div layoutId={`card-icon-${id}`} className="text-7xl">
          {icon}
        </motion.div>
      </motion.article>
    </motion.li>
  );
});

type TCardProps = {
  type: string;
  list: TFood[];
  getType: (type: string) => void;
};

const CardContainer = memo(({ type, getType, list }: TCardProps) => {
  return (
    <div
      className="bg-[#00000033] h-full rounded-md group relative before:absolute before:w-full before:h-full before:z-[1]"
      onMouseUp={() => getType(type)}
    >
      <h2 className="text-3xl text-white font-bold uppercase p-5">{type}</h2>
      <ul className="grid grid-cols-3 gap-6 p-3">
        {list.map((ele) => (
          <motion.li
            layoutId={`card-${ele.id}`}
            key={ele.id}
            className="select-none"
          >
            <motion.article
              layoutId={`card-container-${ele.id}`}
              className="bg-white text-center rounded-md py-3"
            >
              <motion.h3
                layoutId={`card-title-${ele.id}`}
                className="text-md font-bold mb-5 text-gray-700"
              >
                {ele.name}
              </motion.h3>
              <motion.div layoutId={`card-icon-${ele.id}`} className="text-7xl">
                {ele.icon}
              </motion.div>
            </motion.article>
          </motion.li>
        ))}
        <li>
          <article className="bg-[#ffffff33] text-center rounded-md py-3 group-hover:block hidden">
            <h3 className="text-xl font-bold mb-5 text-gray-700 invisible">
              Null
            </h3>
            <div className="text-7xl invisible">⚠️</div>
          </article>
        </li>
      </ul>
    </div>
  );
});

const DragSort = () => {
  const [foods, setFoods] = useState<TFood[]>([]);
  const [type, setType] = useState('');
  const [current, setCurrent] = useState<TFood | null>(null);
  const [desserts, setDesserts] = useState<TFood[]>([]);
  const [drinks, setDrinks] = useState<TFood[]>([]);
  const [fruits, setFruits] = useState<TFood[]>([]);

  useEffect(() => {
    setFoods(foodList);
  }, []);

  const getType = useCallback((type: string) => {
    setType(type);
  }, []);

  const getCurrent = useCallback((food: TFood | null) => {
    setCurrent(food);
  }, []);

  useEffect(() => {
    if (!type) return;
    if (!current) return;
    const removeItem = () => {
      const value = foods.filter((ele) => ele.id !== current.id);
      setFoods(value);
    };
    if (type === 'dessert' && current.type === type) {
      removeItem();
      setDesserts([...desserts, current]);
    } else if (type === 'drink' && current.type === type) {
      removeItem();
      setDrinks([...drinks, current]);
    } else if (type === 'fruit' && current.type === type) {
      removeItem();
      setFruits([...fruits, current]);
    }
    setCurrent(null);
    setType('');
  }, [type, current]);

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-700 to-fuchsia-700 overflow-hidden">
      <div className="h-[70%] grid grid-cols-3 px-6 pt-6 gap-6">
        <CardContainer type="dessert" getType={getType} list={desserts} />
        <CardContainer type="drink" getType={getType} list={drinks} />
        <CardContainer type="fruit" getType={getType} list={fruits} />
      </div>
      <div className="h-[30%] p-6">
        <motion.ul
          layout
          className="bg-[#00000033] p-6 h-full rounded-md grid grid-cols-9 gap-6"
        >
          {foods.map((ele) => (
            <Card key={ele.id} food={ele} getCurrent={getCurrent} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default DragSort;
