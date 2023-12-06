export function Option({ optionData }) {
  const { name, img } = optionData;

  return (
    <button className="option-wrapper">
      <img className="option-img" src={img} />
      <div className="option-name">{name}</div>
    </button>
  );
}

export default Option;
