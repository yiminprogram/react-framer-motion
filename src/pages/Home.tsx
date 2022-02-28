import { useRef, RefObject } from 'react';
import { Link } from 'react-router-dom';
import list from 'src/assets/data.json';
import { motion, Variants, useAnimation } from 'framer-motion';

const titleVariants: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const strVariants: Variants = {
  closed: {
    y: 100,
    opacity: 0,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
    },
  },
};

const cardVariants: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      delayChildren: 1.8,
      staggerChildren: 0.2,
    },
  },
};

const cardItem: Variants = {
  closed: {
    opacity: 0,
    scale: 0.6,
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

type TIconProps = {
  icon: string;
  idx: number;
  parent: RefObject<HTMLDivElement>;
};

const IconImage = ({ icon, idx, parent }: TIconProps) => {
  const animation = useAnimation();
  const h = window.innerHeight;
  const w = (window.innerWidth / 12) * idx;
  (async () => {
    await animation.start({ x: w, opacity: [0, 1] });
    await animation.start({
      y: [
        100,
        h - 55,
        h - 100,
        h - 55,
        h - 80,
        h - 55,
        h - 70,
        h - 55,
        h - 60,
        h - 57.5,
        h - 55,
      ],
      transition: {
        duration: 3,
        type: 'spring',
      },
    });
    await animation.start({
      x: [w, w + 100, w + 80, w + 100, w + 90],
      rotate: [0, 50, 40, 50, 45],
      transition: { duration: 5, type: 'spring' },
    });
  })();
  return (
    <motion.div
      drag
      animate={animation}
      transition={{ delay: 3 + idx * 0.3 }}
      dragConstraints={parent}
      className="inline-block pointer-events-auto"
    >
      <h3 className="text-6xl cursor-grab active:cursor-grabbing">{icon}</h3>
    </motion.div>
  );
};

const welcom = 'Welcome'.split('');

const iconImage = [
  { id: 1, icon: '🍎' },
  { id: 2, icon: '🍇' },
  { id: 3, icon: '🥤' },
  { id: 4, icon: '🍰' },
  { id: 5, icon: '🍌' },
  { id: 6, icon: '🍔' },
  { id: 7, icon: '🍑' },
  { id: 8, icon: '🍋' },
];

const Home = () => {
  const container = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen my-bg-gradient grid grid-cols-1 lg:grid-cols-2">
      <motion.div
        ref={container}
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
      >
        {iconImage.map((ele) => (
          <IconImage
            icon={ele.icon}
            key={ele.id}
            idx={ele.id}
            parent={container}
          />
        ))}
      </motion.div>
      <div className="flex flex-col justify-center pl-[5rem]">
        <motion.h1
          className="text-white font-bold text-8xl mb-16 overflow-hidden"
          variants={titleVariants}
          initial="closed"
          animate="open"
        >
          {welcom.map((ele, idx) => (
            <motion.span
              key={idx}
              variants={strVariants}
              className="inline-block"
            >
              {ele}
            </motion.span>
          ))}
        </motion.h1>
        <h1 className="text-5xl text-white font-bold mb-6 overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
          >
            React Animated Components
          </motion.span>
        </h1>
        <motion.p className="text-white text-2xl overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.3,
              duration: 0.5,
            }}
          >
            Framer Motion @6.2.6
          </motion.span>
        </motion.p>
      </div>
      <div className="flex justify-center items-center">
        <motion.ul
          variants={cardVariants}
          initial="closed"
          animate="open"
          className="grid grid-cols-3 gap-5"
        >
          {list.map((ele) => (
            <motion.li
              key={ele.name}
              variants={cardItem}
              className="text-xl text-white font-bold bg-[#ffffff33] hover:bg-[#ffffff55] rounded-md"
            >
              <Link className="inline-block w-full h-full p-6" to={ele.link}>
                {ele.name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Home;
