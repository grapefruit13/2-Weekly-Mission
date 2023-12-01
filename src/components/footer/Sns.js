export function Sns({ footerSnsData, imageMap }) {
  const { name, url } = footerSnsData;
  const imageSource = imageMap;

  return (
    <>
      <a href={url} target="_blank">
        <img src={imageSource} alt={name} />
      </a>
    </>
  );
}

export default Sns;
