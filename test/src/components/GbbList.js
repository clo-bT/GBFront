import Header from '../components/Header';
import { useLocation, useNavigate  } from 'react-router-dom';


    function GbbList() {
        const location  = useLocation();
        const navigate  = useNavigate();
        const images = location.state && location.state.images ? location.state.images : [];
    return (
        <>
        <div class="background">
        <Header/>
                <h1 class="titlebar">당신의 곰방을 보여주세요</h1>
                <button className='plus-button' onClick={() => navigate("/gbbcreate")}>+</button>
            <div class="content">
            {images.map((image, id) => (
                        <div className="imageContainer" key={id}>
                            <img src={image} alt={`${image}-${id}`} width={'200px'} />
                        </div>
                    ))}
            </div>
        </div>
        </>
    );
}



export default GbbList;