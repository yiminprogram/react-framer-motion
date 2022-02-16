import { useRef } from 'react';
import { motion } from 'framer-motion';
import foods from 'src/assets/food.json';
import { TFood } from 'src/types';

const Card = ({ name, image }: TFood) => {
  return (
    <motion.li
      className="w-72 h-96 rounded-3xl shadow-lg shadow-gray-500 overflow-hidden"
      key={name}
    >
      <img
        className="w-full h-full object-cover pointer-events-none"
        src={image}
        alt={name}
      />
    </motion.li>
  );
};

const Slider = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const slider = useRef<HTMLUListElement | null>(null);

  /* 
    * Manual Setting 
    * Version : framer-motion@4.1.17
    * FIXBUG : slider do not back to original position before container resize

  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!container.current || !slider.current) return;

    const ob = new ResizeObserver(() => {
      const width =
        slider.current!.scrollWidth - container.current!.clientWidth;
      setLeft(-width);
    });

    ob.observe(container.current);
  }, []);
  */

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="overflow-hidden basis-8/12" ref={container}>
        <motion.ul
          className="p-10 flex w-max gap-10 cursor-grab active:cursor-grabbing"
          ref={slider}
          drag="x"
          dragConstraints={container}
        >
          {foods.map((ele) => (
            <Card key={ele.name} {...ele} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Slider;
