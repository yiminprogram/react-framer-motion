import { useRef } from 'react';
import { motion } from 'framer-motion';
import list from 'src/assets/food.json';
import styled from 'src/themes/slider.module.scss';

const Slider = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const slider = useRef<HTMLUListElement | null>(null);

  /* Manual Setting, FIXBUG:slider do not back to original position before container resize

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
    <div className={styled['app']}>
      <div className={styled['slider-container']} ref={container}>
        <motion.ul
          className={styled['slider']}
          ref={slider}
          drag="x"
          dragConstraints={container}
        >
          {list.map((ele) => (
            <motion.li className={styled['slider-item']} key={ele.name}>
              <img src={ele.image} alt={ele.name} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Slider;
