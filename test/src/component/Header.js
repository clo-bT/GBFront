import React from 'react';
import { Link, Outlet } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <Link to = "/">곰방</Link>
            <Link to = "/map">지도</Link>
            <Link to = "/gombangba">곰방봐</Link>
            <Link to = "/zzim">찜 목록</Link>
            <Link to="/roomout">방 내놓기</Link>
            <Outlet />
        </div>
    )
}

export default Header;