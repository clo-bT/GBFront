import Header from "../components/Header"
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
    
    return (
        <div>
            <Header/>
            <div className="main">
                <h1>어떤 방을 찾으시나?</h1>
                <input className="main-search" placeholder="지역을 입력하세요"/>
            </div>
        </div>
        
    )
};