import { DragItem } from './DragItem';
import { DropItem } from './DropItem';
import useUserStore from './useUserStore';

export default function App() {
  const { users } = useUserStore();
  return (
    <div className="h-screen grid grid-cols-3 gap-5 p-5">
      <div className="h-full overflow-y-auto border rounded border-gray-300 grid grid-cols-1 gap-3 p-5">
        {users.map((user, i) => (
          <DragItem id={user.key} value={user.value} key={i} />
        ))}
      </div>
      <div className="col-span-2 grid gap-5" style={{ gridAutoRows: '1fr' }}>
        <div className="border border-gray-300 rounded">
          <DropItem />
        </div>
        <div className="border border-gray-300 rounded">
          <DropItem />
        </div>
        <div className="border border-gray-300 rounded">
          <DropItem />
        </div>
      </div>
    </div>
  );
}
