export function Sns({ footerSnsData }) {
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
