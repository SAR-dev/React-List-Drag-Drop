import * as React from 'react';
import { useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';
import classnames from 'classnames';
import { UserProps, users } from './data/users';
import useUserStore from './useUserStore';

interface DropItemProps { }

export const DropItem = ({ ...props }: DropItemProps) => {
  const { removeUser } = useUserStore();
  const [selectedUsers, setSelectedUsers] = useState<UserProps[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const dropRef = useRef<null | HTMLDivElement>(null);
  const endRef = useRef<null | HTMLDivElement>(null);

  useDrop(dropRef, {
    onDom: (data: number, e) => {
      addToSelectedUser(data);
      setIsHovering(false);
    },
    onDragEnter: () => {
      endRef.current?.scrollIntoView();
      setIsHovering(true)
    },
    onDragLeave: () => setIsHovering(false),
  });

  const addToSelectedUser = (key: number) => {
    const user = users.find((e) => e.key === key);
    if (user) {
      setSelectedUsers([...selectedUsers, user]);
      removeUser(key)
    }
  };

  return (
    <div
      ref={dropRef}
      className={classnames({
        'h-full p-5 overflow-y-auto': true,
        'bg-gray-100': isHovering,
      })}
      style={{maxHeight: "30vh"}}
    >
      <div className=" grid grid-cols-2 gap-3">
        {selectedUsers.map((e, i) => (
          <div
            className="px-5 py-2 border border-gray-300 bg-gray-100 rounded"
            style={{ height: 'fit-content' }}
            key={i}
          >
            {e.value}
          </div>
        ))}
        {isHovering && (
          <div
            className="px-5 py-2 border border-dashed border-gray-300 bg-white rounded"
            style={{ height: 'fit-content' }}
          >
            Release here
          </div>
        )}
      </div>
      <div ref={endRef}></div>
    </div>
  );
};
