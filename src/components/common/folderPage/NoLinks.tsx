import "../../../assets/styles/folderPage/NoLinks.css";

interface Props {
  msg: string;
}

export function Nolinks({ msg }: Props) {
  return <div className="no-links">{msg}</div>;
}

export default Nolinks;
