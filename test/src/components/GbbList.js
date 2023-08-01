import Header from '../components/Header';
import { useLocation, useNavigate  } from 'react-router-dom';


const GbbList = () => {
    const location = useLocation();
        const navigate  = useNavigate();
        const gbbList = location.search ? JSON.parse('[' + decodeURIComponent(location.search.substring(1)).replace(/&/g, ',') + ']') : [];
    return (
        <div className="background">
        <Header/>
                <h1 className="titlebar">당신의 곰방을 보여주세요</h1>
                <button className='plus-button' onClick={() => navigate("/gbbcreate")}>+</button>
                <input className='gbb-search' placeholder='보고싶은 지역을 입력하세요'/>
                <div className="content">
                {gbbList.map((gbb, index) => (
                    <div key={index} className="gbbContainer">
                        <div className="images">
                            {gbb.images.map((image, id) => (
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
                ))}
            </div>
        </div>
    );
};




export default GbbList;