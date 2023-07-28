import React from 'react';
import { Link, Outlet } from "react-router-dom";
import './Header.css';

const Header = () => {
    return (
        <>
        <header className='navbar'>
        <nav>
            <ul>
                <li><Link to = "/">곰방</Link></li>
                <li><Link to = "/map">지도</Link></li>
                <li><Link to = "/gombangba">곰방봐</Link></li>
                <li><Link to = "/zzim">찜 목록</Link></li>
                <li><Link to="/roomout">방 내놓기</Link></li>
               
            </ul>
            </nav>
            <div>
                <Link to="/login">
                    <button>회원가입/로그인</button>
                </Link>
            </div>
        </header>
            <div>
                <Outlet />
            </div>
            </>
        
    )
}

export default Header;