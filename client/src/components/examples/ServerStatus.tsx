import ServerStatus from '../ServerStatus';

export default function ServerStatusExample() {
  return (
    <div className="p-8 space-y-4">
      <ServerStatus online={true} playerCount={247} />
      <ServerStatus online={false} />
    </div>
  );
}
