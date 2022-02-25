import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useElementScroll,
  useMotionValue,
  Variants,
} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';

const horizontal = 3690;

const images = [
  {
    id: 1,
    url: 'https://images.unsplash.com/uploads/14126758789351371c7ec/aa322c2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2348&q=80',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1601236414929-677713b2d078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3690&q=80',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1617634840550-76e978d59093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1618082976772-d6e3f7baf51f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
];

const cardFadeIn: Variants = {
  closed: (i) => ({
    opacity: 0,
    y: i % 2 === 0 ? -50 : 50,
  }),
  open: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  }),
  focus: (i) => ({
    scale: 1.1,
    rotate: i % 2 === 0 ? 10 : -10,
    transition: {
      duration: 0.5,
    },
  }),
};

const HorizontalScroll = () => {
  const container = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [listen, setListen] = useState(false);
  const { scrollY } = useElementScroll(container);
  useEffect(() => {
    if (!listen) return;
    const handleScroll = scrollY.onChange((e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (e - h >= 0 && e <= horizontal) {
        const ratio = (horizontal - w) / (horizontal - h);
        x.set(-(e - h) * ratio);
      } else if (e > horizontal) {
        x.set(-horizontal + w);
      }
    });
    return () => {
      handleScroll();
    };
  }, [listen, scrollY, x]);
  return (
    <div className="w-screen h-screen overflow-x-hidden" ref={container}>
      <div
        className="bg-cover bg-no-repeat h-screen flex justify-center items-center bg-fixed"
        style={{ backgroundImage: `url(${images[0].url})` }}
      >
        <motion.h2 className="text-white text-5xl font-bold">
          Scroll
          <motion.span
            animate={{ y: [-30, 30], opacity: [0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="ml-5 inline-block"
          >
            <FontAwesomeIcon icon={faComputerMouse} />
          </motion.span>
        </motion.h2>
      </div>
      <div style={{ height: horizontal }}>
        <motion.div
          style={{
            x,
            backgroundImage: `url(${images[1].url})`,
            width: horizontal,
          }}
          className="h-screen px-52 space-x-10 sticky top-0 flex flex-wrap"
          onViewportEnter={() => setListen(true)}
          onViewportLeave={() => setListen(false)}
        >
          {Array(6)
            .fill(0)
            .map((ele, idx) => (
              <div
                key={idx}
                className={`h-full py-28 flex flex-col ${
                  idx % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
                style={{ width: horizontal / 8 }}
              >
                <motion.div
                  variants={cardFadeIn}
                  custom={idx}
                  initial="closed"
                  whileInView="open"
                  whileHover="focus"
                  viewport={{ amount: 0.6, once: true }}
                  className="p-5 bg-white rounded-lg overflow-hidden"
                >
                  <img
                    src={images[4].url}
                    alt="error"
                    className="w-full object-cover rounded-lg"
                  />
                </motion.div>
              </div>
            ))}
        </motion.div>
      </div>
      <div
        className="h-screen bg-cover bg-no-repeat bg-fixed flex justify-center items-center"
        style={{ backgroundImage: `url(${images[2].url})` }}
      ></div>
    </div>
  );
};

export default HorizontalScroll;
