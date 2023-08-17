import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "../components/Gbb.module.css";
import gbbCreateStyles from "../components/GbbCreate.module.css";

const Create = ({ onImageUpload }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [hashtag, setHashtag] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_ROOT; // 백엔드 서버의 주소
  const uploadUrl = `${apiUrl}/show/add`;

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };
  const handleHashtagChange = (event) => {
    setHashtag(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value.trim();
      if (hashtag.trim() !== "" && !selectedHashtags.includes("#" + value)) {
        setSelectedHashtags([...selectedHashtags, "#" + hashtag]);
        setHashtag("");
      } else {
        event.preventDefault(); // 기본 동작 방지하여 커서가 입력창에 남아있게 함
        event.target.value = ""; // 이미 있는 해시태그나 유효하지 않은 입력일 경우 입력창 비우기
      }
    }
  };

  const handleUpload = async () => {
    if (selectedImages.length > 0 || hashtag.trim() !== "") {
      const newImageGroup = {
        room_deal_id: 123, // 실제 room_deal_id로 변경해야 합니다
        user_id: "user123", // 실제 user_id로 변경해야 합니다
        images: selectedImages.map((image) => ({
          src: URL.createObjectURL(image),
        })),
        tags: selectedHashtags.map((tag) => ({ tag_name: tag })),
      };
      try {
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newImageGroup),
        });

        if (response.ok) {
          // 성공 시, 필요한 동작을 수행합니다
          setSelectedImages([]);
          setHashtag("");
          navigate("/gbblist");
        } else {
          // 에러 처리
          console.error("에러:", response.status);
        }
      } catch (error) {
        console.error("에러:", error);
      }
    }
  };

  return (
    <div>
      <Header /> {/* 헤더 */}
      <div>
        {/* 곰방봐 Create Form div */}
        <div className={gbbCreateStyles.gbbCreateDiv}>
          {/* 곰방봐 올리기 div */}
          <div className={gbbCreateStyles.gbbCreateH1}>
            <h1>곰방봐 올리기</h1>
          </div>
          <div></div>
          {/* 사진 업로드 */}
          <div className={gbbCreateStyles.gbbCreateContent}>
            <h2 className={gbbCreateStyles.gbbCreateImageH2}>곰방 사진</h2>
            <div className={styles.inputbox}>
              <div
                className={styles.imageinput}
                onClick={() => document.getElementById("image-upload").click()}
              >
                <button> + </button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          {/* 해시태그 */}
          <div className={gbbCreateStyles.gbbCreateContent}>
            <h2>해시태그 입력</h2>
            <div className={gbbCreateStyles.tagInputDiv}>
              <input
                type="text"
                value={hashtag}
                onKeyDown={handleKeyDown}
                onChange={handleHashtagChange}
                placeholder="# 해시태그를 입력하세요"
                className={gbbCreateStyles.tagInput}
              />
            </div>
            <div className={gbbCreateStyles.tagList}>
              {selectedHashtags.map((tag, index) => (
                <span className={gbbCreateStyles.tagListItem} key={index}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* 버튼 */}
          <div className={gbbCreateStyles.gbbCreateContent}>
            <button onClick={handleUpload} className={gbbCreateStyles.gbbCreateBtn}>
              <h2>곰방 올리기</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
