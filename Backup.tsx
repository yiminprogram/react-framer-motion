import { useState, useEffect, memo, useCallback } from 'react';
import { motion, Reorder } from 'framer-motion';

type TFood = {
  id: number;
  name: string;
  icon: string;
  type: string;
};

type TProps = {
  food: TFood;
  getCurrent: (item: TFood) => void;
  addItem: () => void;
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

const Card = memo(({ food, getCurrent, addItem }: TProps) => {
  const { name, icon, id } = food;
  return (
    <Reorder.Item
      drag
      layoutId={`card-${id}`}
      value={food}
      onDragStart={() => getCurrent(food)}
      onDragEnd={addItem}
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
    </Reorder.Item>
  );
});

type TCardProps = {
  type: string;
  list: TFood[];
  getType: (type: string) => void;
};

const CardContainer = memo(({ type, getType, list }: TCardProps) => {
  console.log('render');
  return (
    <div
      className="bg-[#00000033] h-full rounded-md p-5 group"
      onMouseEnter={() => getType(type)}
      onMouseLeave={() => getType('')}
    >
      <h2 className="text-3xl text-white font-bold uppercase">{type}</h2>
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
        {/* <li>
          <article className="bg-[#ffffff33] text-center rounded-md py-3 group-hover:block hidden">
            <h3 className="text-xl font-bold mb-5 text-gray-700 invisible">
              Null
            </h3>
            <div className="text-7xl invisible">⚠️</div>
          </article>
        </li> */}
      </ul>
    </div>
  );
});

const DragSort = () => {
  const [foods, setFoods] = useState<TFood[]>([]);
  const [current, setCurrent] = useState<TFood | null>(null);
  const [type, setType] = useState('');
  const [desserts, setDesserts] = useState<TFood[]>([]);
  const [drinks, setDrinks] = useState<TFood[]>([]);
  const [fruits, setFruits] = useState<TFood[]>([]);

  useEffect(() => {
    setFoods(foodList);
  }, []);

  const getCurren = useCallback((item: TFood) => {
    setCurrent(item);
  }, []);

  const getType = useCallback((type: string) => {
    setType(type);
  }, []);

  const addItem = () => {
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
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-700 to-fuchsia-700 overflow-hidden">
      <div className="h-[70%] grid grid-cols-3 px-6 pt-6 gap-6">
        <CardContainer type="dessert" getType={getType} list={desserts} />
        <CardContainer type="drink" getType={getType} list={drinks} />
        <CardContainer type="fruit" getType={getType} list={fruits} />
      </div>
      <div className="h-[30%] p-6">
        <Reorder.Group
          layout
          axis="x"
          values={foods}
          onReorder={setFoods}
          className="bg-[#00000033] p-6 h-full rounded-md grid grid-cols-9 gap-6"
        >
          {foods.map((ele) => (
            <Card
              key={ele.id}
              food={ele}
              getCurrent={getCurren}
              addItem={addItem}
            />
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default DragSort;
