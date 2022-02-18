import { useState, memo, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, Reorder } from 'framer-motion';

type TNotification = {
  status: boolean;
  time: Date;
};

const Item = memo(
  ({
    status,
    time,
    removeItem,
  }: TNotification & { removeItem: (time: Date) => void }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        removeItem(time);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }, [removeItem, time]);

    const textColor = status ? 'text-green-500' : 'text-red-500';
    const borderColor = status ? 'border-green-500' : 'border-red-500';
    return (
      <Reorder.Item
        value={time}
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 500 }}
        transition={{ duration: 0.2 }}
        dragListener={false}
        className={`bg-white rounded-md shadow-md shadow-gray-600 mb-5 flex border-l-8 ${borderColor} py-3 relative group`}
      >
        <button
          className="absolute top-0 right-1 text-white group-hover:text-gray-500 cursor-pointer"
          onClick={() => removeItem(time)}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        <div
          className={`text-3xl pl-5 pr-2 inline-flex items-center ${textColor}`}
        >
          {status ? (
            <FontAwesomeIcon icon={faCircleCheck} />
          ) : (
            <FontAwesomeIcon icon={faCircleExclamation} />
          )}
        </div>
        <div className="flex-1 p-3">
          <div className="flex mb-2">
            <h2 className={`flex-1 text-lg font-bold ${textColor}`}>
              {status ? 'Success' : 'Warning'}
            </h2>
            <time className="text-gray-400">
              {new Date(time).toLocaleTimeString()}
            </time>
          </div>
          <p className="text-gray-800">Hello World</p>
        </div>
      </Reorder.Item>
    );
  },
);

const Notification = () => {
  const [list, setList] = useState<TNotification[]>([]);

  const addNotification = (notification: TNotification) => {
    setList([...list, notification]);
  };

  const removeItem = useCallback(
    (time: Date) => {
      const value = list.filter((ele) => ele.time !== time);
      setList(value);
    },
    [list],
  );

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-600 to-purple-600">
      <div className="flex flex-col p-10 space-y-5 pr-[500px]">
        <button
          onClick={() => addNotification({ status: true, time: new Date() })}
          className="bg-green-600 text-3xl font-bold p-5 rounded-md text-white hover:bg-green-700 active:bg-green-600 shadow-md"
        >
          Add Success Notification
        </button>
        <button
          onClick={() => addNotification({ status: false, time: new Date() })}
          className="bg-red-600 text-3xl font-bold p-5 rounded-md text-white hover:bg-red-700 active:bg-red-600 shadow-md"
        >
          Add Warning Notification
        </button>
      </div>
      <Reorder.Group
        axis="y"
        values={list}
        onReorder={setList}
        className="absolute top-0 right-0 w-[500px] h-screen pr-6 py-6 overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {list.map((ele) => (
            <Item key={ele.time.getTime()} {...ele} removeItem={removeItem} />
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
};

export default Notification;
