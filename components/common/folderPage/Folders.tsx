interface Props {
  className: string;
  folder: { name: string };
}

export function Folders({ className, folder }: Props) {
  const { name } = folder;
  return <button className={className}>{name}</button>;
}

export default Folders;
