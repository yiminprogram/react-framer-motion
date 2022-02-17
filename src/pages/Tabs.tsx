import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TNav = {
  id: number;
  title: string;
  icon: string;
};

type TProps = TNav & {
  current: number;
  selectTab: (index: number) => void;
};

const navList: TNav[] = [
  { id: 1, title: 'apple', icon: '🍎' },
  { id: 2, title: 'cake', icon: '🍰' },
  { id: 3, title: 'coffee', icon: '☕️' },
];

const NavItem = ({ id, title, icon, current, selectTab }: TProps) => {
  return (
    <li className="flex-1 relative">
      <button
        className="w-full flex justify-center items-center py-3"
        onClick={() => selectTab(id)}
      >
        <span className="text-3xl mr-1">{icon}</span>
        <span className="text-lg">{title}</span>
      </button>
      {current === id && (
        <motion.span
          layoutId="underline"
          className="block absolute h-[3px] bg-cyan-600 w-full"
        />
      )}
    </li>
  );
};

const Tabs = () => {
  const [current, setCurrent] = useState(1);

  const selectTab = (index: number) => {
    setCurrent(index);
  };

  const currentTab = navList.find((ele) => ele.id === current);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-violet-600 to-fuchsia-600">
      <div className="basis-[500px] bg-white shadow-lg shadow-gray-600 rounded-lg overflow-hidden">
        <nav>
          <ul className="flex justify-around border-b">
            {navList.map((ele) => (
              <NavItem
                key={ele.id}
                {...ele}
                current={current}
                selectTab={selectTab}
              />
            ))}
          </ul>
        </nav>
        <main className="h-60">
          <AnimatePresence exitBeforeEnter>
            <motion.h2
              key={current}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-9xl h-full w-full flex justify-center items-center"
            >
              {currentTab ? currentTab.icon : '😜'}
            </motion.h2>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Tabs;
