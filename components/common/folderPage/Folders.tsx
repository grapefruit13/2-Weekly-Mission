interface Props {
  className: string;
  folder: { name: string };
}

export default function Folders({ className, folder }: Props) {
  const { name } = folder;
  return <button className={className}>{name}</button>;
}
