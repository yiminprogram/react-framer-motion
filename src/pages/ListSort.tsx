import { useState, useRef, RefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';

type TList = {
  id: number;
  title: string;
  icon: string;
};

type TProps = {
  item: TList;
  container: RefObject<HTMLUListElement>;
};

const iconList: TList[] = [
  { id: 1, title: 'apple', icon: '🍎' },
  { id: 2, title: 'cake', icon: '🍰' },
  { id: 3, title: 'coffee', icon: '☕️' },
  { id: 4, title: 'burger', icon: '🍔' },
  { id: 5, title: 'juice', icon: '🧃' },
];

const ListItem = ({ item, container }: TProps) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      className="bg-white py-3 px-6 my-3 flex items-center rounded-md text-gray-600 select-none"
      value={item}
      id={item.title}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      dragConstraints={container}
    >
      <span className="text-3xl mr-2.5">{item.icon}</span>
      <span className="text-lg font-semibolda">{item.title}</span>
      <span
        className="ml-auto hover:cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <FontAwesomeIcon icon={faGrip} />
      </span>
    </Reorder.Item>
  );
};

const ListSort = () => {
  const [list, setList] = useState(iconList);
  const container = useRef<HTMLUListElement | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-violet-500 flex justify-center items-center">
      <Reorder.Group
        className="p-3 basis-[500px]"
        axis="y"
        values={list}
        onReorder={setList}
        ref={container}
      >
        {list.map((ele) => (
          <ListItem key={ele.id} item={ele} container={container} />
        ))}
      </Reorder.Group>
    </div>
  );
};

export default ListSort;
