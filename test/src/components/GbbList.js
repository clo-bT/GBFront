import Header from '../components/Header';
import {  useNavigate  } from 'react-router-dom';
import { useEffect,useState } from 'react';


const GbbList = () => {
    const navigate  = useNavigate();
    const [imgs,setimgs] = useState([])
    const [tags,settags] = useState([])
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const imgParams = searchParams.getAll('img');
        const tagParams = searchParams.getAll('tag');
    
        // Parse the gbbParams into an array of objects
        const imgList = imgParams.map(param => JSON.parse(decodeURIComponent(param)));
        const tagList = tagParams.map(param => JSON.parse(decodeURIComponent(param)));
        console.log('Parsed imgList:', imgList);
        console.log('Parsed tagList:', tagList);
        setimgs(imgList)
        settags(tagList)
    }, []);
    return (
        <div className="background">
        <Header/>
                <h1 className="titlebar">당신의 곰방을 보여주세요</h1>
                <button className='plus-button' onClick={() => navigate("/gbbcreate")}>+</button>
                <input className='gbb-search' placeholder='보고싶은 지역을 입력하세요'/>
                <div className="content">
                {/* {gbbList.map((gbb, index) => (
                    <div key={index} className="gbbContainer">
                        <div className="images">
                            {gbb.map((image, id) => (
                                <img key={id} src={image} alt={`${image}-${id}`} width={'200px'} />
                            ))}
                        </div>
                        <div className="hashtags">
                            {gbb.hashtags.map((tag, id) => (
                                <div key={id}>
                                    #{tag}
                                </div>
                            ))}
                        </div>
                    </div>
                ))} */}
                {imgs.map((url)=>(
                    <div key={url.id}>
                    <img src={url} alt={url.id}></img>
                    {/* <span>{url}</span> */}
                    </div>

                ))}
                {tags.map((tag)=>(
                    <div key={tag.id}>
                    <span>#{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};




export default GbbList;