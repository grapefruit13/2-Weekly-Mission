import "../../../assets/styles/folderPage/AddLink.css";

function AddLink() {
  return (
    <div className="add-link-container">
      <div className="add-link-wrapper">
        <input
          className="add-link"
          type="text"
          placeholder="링크를 추가해보세요"
        />
        <button className="add-link_add-btn">추가하기</button>
      </div>
    </div>
  );
}

export default AddLink;
