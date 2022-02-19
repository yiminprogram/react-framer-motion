import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type TFruit = {
  id: number;
  name: string;
  icon: string;
  color: string;
  hover: string;
};

type TProps = { item: TFruit; getItem: (item: TFruit) => void };

const friuts = [
  {
    id: 1,
    name: 'apple',
    icon: '🍎',
    color: 'bg-red-600',
    hover: 'hover:bg-red-700',
  },
  {
    id: 2,
    name: 'lemon',
    icon: '🍋',
    color: 'bg-lime-600',
    hover: 'hover:bg-lime-700',
  },
  {
    id: 3,
    name: 'grape',
    icon: '🍇',
    color: 'bg-purple-600',
    hover: 'hover:bg-purple-700',
  },
  {
    id: 4,
    name: 'banana',
    icon: '🍌',
    color: 'bg-yellow-600',
    hover: 'hover:bg-yellow-700',
  },
  {
    id: 5,
    name: 'watermelon',
    icon: '🍉',
    color: 'bg-rose-600',
    hover: 'hover:bg-rose-700',
  },
  {
    id: 6,
    name: 'orange',
    icon: '🍊',
    color: 'bg-orange-600',
    hover: 'hover:bg-orange-700',
  },
];

const Card = memo(({ item, getItem }: TProps) => {
  const { name, icon, id } = item;
  return (
    <motion.li
      layoutId={`container-${id}`}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="bg-white py-3 px-5 rounded-lg cursor-pointer"
      onClick={() => getItem(item)}
    >
      <motion.h2
        layoutId={`title-${id}`}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-xl font-bold mb-2 text-gray-600 uppercase"
      >
        {name}
      </motion.h2>
      <motion.div
        layoutId={`icon-${id}`}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="flex justify-center items-center text-[10rem]"
      >
        {icon}
      </motion.div>
    </motion.li>
  );
});

const CardInfo = () => {
  const [list, setList] = useState<TFruit[]>([]);
  const [selectItem, setSelectItem] = useState<null | TFruit>(null);

  const modal = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setList(friuts);
  }, []);

  const getItem = useCallback((item: TFruit) => {
    setSelectItem(item);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-rose-600 to-orange-300 flex justify-center items-center overflow-hidden">
      <LayoutGroup>
        <motion.ul layout className="basis-[960px] grid grid-cols-3 gap-6">
          {list.map((ele) => (
            <Card key={ele.id} item={ele} getItem={getItem} />
          ))}
        </motion.ul>
        <AnimatePresence>
          {selectItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                ref={modal}
                onClick={() => setSelectItem(null)}
                className="fixed w-screen h-screen bg-black"
              ></motion.div>
              <motion.div
                layoutId={`container-${selectItem.id}`}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="bg-white rounded-md px-5 py-8 fixed w-1/2"
              >
                <div className="absolute top-5 right-5">
                  <button
                    className="bg-neutral-200 hover:bg-neutral-300 w-10 h-10 rounded-full"
                    onClick={() => setSelectItem(null)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
                <motion.div
                  layoutId={`icon-${selectItem.id}`}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="text-[10rem] w-[13rem] h-[13rem] flex justify-center items-center absolute -top-[30%] -left-[10%] z-10"
                >
                  {selectItem.icon}
                </motion.div>
                <motion.h2
                  layoutId={`title-${selectItem.id}`}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="text-3xl text-gray-700 font-bold mb-9 pl-[5rem] uppercase"
                >
                  {selectItem.name}
                </motion.h2>
                <p className="text-lg text-gray-500 mb-5 px-5">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
                  sed officiis facere sint tempora magnam error eum perferendis
                  qui et fugiat, ducimus saepe, libero accusamus commodi, neque
                  vel esse rem?
                </p>
                <div className="text-right">
                  <button
                    className={`py-2 px-5 text-neutral-100 text-lg font-bold rounded-md ${selectItem.color} ${selectItem.hover}`}
                  >
                    Button
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

export default CardInfo;
