import share from "../../../assets/icons/option/share.svg";
import pen from "../../../assets/icons/option/pen.svg";
import trashCan from "../../../assets/icons/option/trash-can.svg";
import Option from "./Option";

export function FolderOptions() {
  const optionDatas = [
    { id: 1, name: "공유", img: share },
    { id: 2, name: "이름 변경", img: pen },
    { id: 3, name: "삭제", img: trashCan },
  ];

  return (
    <div className="option-container">
      {optionDatas.map((option, i) => {
        return (
          <div key={`option-${i}`}>
            <Option optionData={option} />
          </div>
        );
      })}
    </div>
  );
}

export default FolderOptions;
