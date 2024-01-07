interface Props {
  footerSnsData: {
    id: number;
    name: string;
    url: string;
    img: string;
  };
}

export function Sns({ footerSnsData }: Props) {
  const { name, url, img } = footerSnsData;

  return (
    <>
      <a href={url} target="_blank" rel="noreferrer">
        <img src={img} alt={name} />
      </a>
    </>
  );
}

export default Sns;
