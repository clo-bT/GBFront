import Header from '../components/Header';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const GbbCreate = () => {
    const [showImages, setShowImages] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const navigate = useNavigate();
    const [gbbList, setGbbList] = useState([]);

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

    const handleHashTagKeyPress = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value.trim();
            if (value && !hashtags.includes(value)) {
                setHashtags([...hashtags, value]);
                event.target.value = '';
            } else {
                event.preventDefault(); // 기본 동작 방지하여 커서가 입력창에 남아있게 함
                event.target.value = ''; // 이미 있는 해시태그나 유효하지 않은 입력일 경우 입력창 비우기
            }
        }
    };
    const handleDeleteHashtag = (index) => {
        const newHashtags = [...hashtags];
        newHashtags.splice(index, 1);
        setHashtags(newHashtags);
    };
    const handleSubmit = () => {
        const newGbb = {
            images: showImages,
            hashtags: hashtags,
        };
        console.log(newGbb)

        // 새로운 입력 내용을 배열에 추가
        setGbbList([...gbbList, newGbb]);

        console.log(gbbList);
        console.log(newGbb);
        // 입력창 초기화
        
        const query = new URLSearchParams(gbbList.map(gbb => JSON.stringify(gbb))).toString();
        navigate('/gbblist?' + query);
        // setShowImages([]);
        // setHashtags([]);
    
    };

    
    return (
        <div className="addPicture">
            <Header/>
            <h1>당신의 곰방을 보여주세요</h1> 
            <div className="gom-container">
                <h2>곰방 올리기</h2>
            </div>

            <div className="form-wrapper">
                <label
                    htmlFor="input-file"
                    className="addButton"
                    onChange={handleAddImages}>
                    <input
                        type="file"
                        id="input-file"
                        multiple
                        className="addButton" />
            <span>사진추가</span>
            </label>
                <input
                    className="title-input"
                    type="text"
                    placeholder="# 해시태그를 입력하세요"
                    onKeyPress={handleHashTagKeyPress}/>
            </div>

            <div className='hashtags'>
            {hashtags.map((tag, index) => (
                <div key={index}>
                    #{tag}
                    <button onClick={() => handleDeleteHashtag(index)}>X</button>
                </div>
            ))}
            </div>
            
            {showImages.map((image, id) => (
            <div className="imageContainer" key={id}>
                <img src={image} alt={`${image}-${id}`} width={'200px'} />
                    <button onClick={() => handleDeleteImage(id)}>X</button>
            </div>
            ))}
            <button className="submit-button" onClick={handleSubmit}>입력</button>
        </div>
        );
    };

export default GbbCreate;