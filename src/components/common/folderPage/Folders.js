export function Folders({ className, folder }) {
  const { name } = folder;
  return <button className={className}>{name}</button>;
}

export default Folders;
