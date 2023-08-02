import React, { useState } from 'react';
import { useNavigate   } from 'react-router-dom';
import Header from './Header';

const Create = ({ onImageUpload }) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [hashtag, setHashtag] = useState('');
        const navigate = useNavigate  ();
        
        const handleImageChange = (event) => {
        const files = event.target.files;
        setSelectedImages([...selectedImages, ...files]);
    };
    const handleHashtagChange = (event) => {
        setHashtag(event.target.value);
    };
    const handleUpload = () => {
        if (selectedImages.length > 0 && hashtag.trim() !== '') {
        const newImageGroup = {
            hashtag: hashtag,
            images: selectedImages,
        };

        // 이미지들을 로컬에 저장하고 리스트에 추가하는 함수 호출
        // onImageUpload({ hashtag, images: selectedImages });
        onImageUpload(newImageGroup);
        setSelectedImages([]);
        setHashtag('');
        navigate('/gbblist');
        // navigate('/list', {setSelectedImages});
        } else {
        alert('사진과 해쉬태그를 입력해주세요');
        }
    };

    return (
        <div>
            <Header />
        <div>
            <input
                type="file"
                accept="image/*"
                multiple
            onChange={handleImageChange} />
        
        </div>
        <div>
            <label>해시태그:</label>
            <input type="text" value={hashtag} onChange={handleHashtagChange} placeholder='# 해시태그를 입력하세요'/>
            </div>
            
        <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default Create;
