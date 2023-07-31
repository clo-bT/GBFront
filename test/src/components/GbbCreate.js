import { useState } from "react";

const GbbCreate = () => {
    const [showImages, setShowImages] = useState([]);
  
    // 이미지 상대경로 저장
    const handleAddImages = (event) => {
      const imageLists = event.target.files;
      let imageUrlLists = [...showImages];
  
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
  
      if (imageUrlLists.length > 10) {
        imageUrlLists = imageUrlLists.slice(0, 10);
      }
  
      setShowImages(imageUrlLists);
    };
  
    // X버튼 클릭 시 이미지 삭제
    const handleDeleteImage = (id) => {
      setShowImages(showImages.filter((_, index) => index !== id));
    };
  
    return (
        <div className="addPicture">
            <h1>당신의 곰방을 보여주세요</h1> 
            <div className="gom-container">
                <h2>곰방 올리기</h2>
            </div>
            <div className="form-wrapper">
        <label htmlFor="input-file" className="addButton" onChange={handleAddImages}>
          <input type="file" id="input-file" multiple className="addButton" />
          <span>사진추가</span>
        </label>
                <input className="title-input" type="text" placeholder="# 해시태그를 입력하세요" />
                </div>
        {showImages.map((image, id) => (
          <div className="imageContainer" key={id}>
            <img src={image} alt={`${image}-${id}`} width={'200px'} />
                <button onClick={() => handleDeleteImage(id)}>X</button>
          </div>
        ))}
        <button className="submit-button">입력</button>
      </div>
    );
  };

export default GbbCreate;
