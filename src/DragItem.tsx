import * as React from 'react';
import { useRef, useState } from 'react';
import { useDrop, useDrag } from 'ahooks';
import classnames from 'classnames';

interface DragItemProps {
  value: any;
  id: string | number;
}

export const DragItem = ({ ...props }: DragItemProps) => {
  const dragRef = useRef(null);

  const [dragging, setDragging] = useState(false);

  useDrag(props.id, dragRef, {
    onDragStart: () => {
      setDragging(true);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  return (
    <div
      ref={dragRef}
      className={classnames({
        'px-5 py-2 border border-gray-300 rounded cursor-move': true,
        'bg-gray-100': !dragging,
        'border-dashed bg-white': dragging,
      })}
    >
      {props.value}
    </div>
  );
};
