import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo, Variants } from 'framer-motion';

const images = [
  {
    id: 1,
    name: 'Gorilla',
    image:
      'https://images.unsplash.com/photo-1579547056746-16b54ded5745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80',
  },
  {
    id: 2,
    name: 'Bear',
    image:
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 3,
    name: 'Koala',
    image:
      'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2338&q=80',
  },
  {
    id: 4,
    name: 'Lion',
    image:
      'https://images.unsplash.com/photo-1628961202448-01182dd9b88c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 5,
    name: 'Dolphin',
    image:
      'https://images.unsplash.com/photo-1591706405280-f03acb082051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2386&q=80',
  },
  {
    id: 6,
    name: 'Deer',
    image:
      'https://images.unsplash.com/photo-1570422593863-bd38ef7ce050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
];

const ImageVariants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  drag: {
    opacity: 0.8,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

type TData = {
  id: number;
  name: string;
  image: string;
};

const Carousel = () => {
  const [data, setData] = useState<TData[]>([]);
  const [item, setItem] = useState<TData[]>([]);
  const [[index, direction], setIndex] = useState([0, 1]);

  const nextImage = useCallback(() => {
    if (index === data.length - 1) {
      setIndex([0, 1]);
    } else {
      setIndex((i) => [i[0] + 1, 1]);
    }
  }, [index, data]);

  const prevImage = () => {
    if (index === 0) {
      setIndex([data.length - 1, 0]);
    } else {
      setIndex((i) => [i[0] - 1, 0]);
    }
  };

  useEffect(() => {
    setData(images);
    const timer = setInterval(() => {
      nextImage();
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [nextImage]);

  useEffect(() => {
    if (data.length === 0) return;
    setItem([data[index]]);
  }, [index, data]);

  const handleDragEnd = (e: any, info: PanInfo) => {
    if (info.offset.x > 100) {
      prevImage();
    } else if (info.offset.x < -100) {
      nextImage();
    }
  };

  return (
    <div className="my-bg-gradient w-screen h-screen flex justify-center items-center">
      <div className="basis-[650px] p-2">
        <div className="h-[400px] relative">
          <AnimatePresence>
            {item.map((ele) => (
              <motion.div
                drag="x"
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                variants={ImageVariants}
                onDragEnd={handleDragEnd}
                initial="closed"
                animate="open"
                exit="closed"
                whileDrag="drag"
                transition={{ duration: 1 }}
                key={ele.id}
                className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
              >
                <img
                  className="w-full h-full object-cover pointer-events-none"
                  src={ele.image}
                  alt={ele.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <ul className="flex space-x-6 absolute bottom-10 left-0 w-full px-3">
            {images.map((ele, idx) => (
              <li key={ele.id} className="flex-1 h-2 rounded-full bg-[#fff6]">
                <motion.span
                  initial={{ width: 0, display: 'none' }}
                  animate={{
                    width: idx === index ? '100%' : 0,
                    display: idx === index ? 'block' : 'none',
                  }}
                  transition={{ duration: 3, type: 'tween' }}
                  className="h-full bg-[#fff] rounded-full"
                ></motion.span>
              </li>
            ))}
          </ul>
          <div className="absolute -bottom-8 left-[5%] w-[90%] h-14 overflow-hidden">
            <AnimatePresence>
              {item.map((ele) => (
                <motion.h2
                  key={ele.id}
                  initial={{ opacity: 0, x: direction === 1 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 1 ? -300 : 300 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center font-bold text-2xl text-gray-700 rounded-lg bg-white"
                >
                  {ele.name}
                </motion.h2>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
