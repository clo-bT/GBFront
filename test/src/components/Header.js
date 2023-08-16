import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

const Header = () => {
	const [isAuthorized, setIsAuthorized] = useState("");
	const [userinfo, setUserinfo] = useState({});
	useEffect(() => {
		setIsAuthorized(sessionStorage.getItem("isAuthorized"));
		setUserinfo(JSON.parse(sessionStorage.getItem("member")));
	}, []); // This effect runs once when the component mounts

	useEffect(() => {
		const member = JSON.parse(sessionStorage.getItem("member"));
		if (member === null) return;
		const userid = member.id;
		// 로그아웃하면 eventSource 비워줘야 함
		// const eventSource = new EventSource(
		// 	`http://localhost:8080/notification/subscribe/${userid}`
		// );
		const eventSource = sessionStorage.getItem("eventSource");

		eventSource.addEventListener("sse", function (event) {
			console.log(event.data);

			// const data = JSON.parse(event.data);

			(async () => {
				// 브라우저 알림
				const showNotification = () => {
					const notification = new Notification("알림", {
						body: event.data.content,
					});

					setTimeout(() => {
						notification.close();
					}, 10 * 1000);

					notification.addEventListener("click", () => {
						window.open(event.data.url, "_blank");
					});
					// 클릭하면 읽음 표시하는 api도 요청해야댐
				};

				// 브라우저 알림 허용 권한
				let granted = false;

				if (Notification.permission === "granted") {
					granted = true;
				} else if (Notification.permission !== "denied") {
					let permission = await Notification.requestPermission();
					granted = permission === "granted";
				}

				// 알림 보여주기
				if (granted) {
					showNotification();
				}
			})();
		});
	}, [userinfo]);

	function handleLogout() {
		setIsAuthorized(false);
		sessionStorage.removeItem("isAuthorized");
		sessionStorage.removeItem("member");
		window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_REST_API_MAP_KEY}&logout_redirect_uri=${process.env.REACT_APP_HOME_URL}`;
	}

	return (
		<div>
			{isAuthorized ? (
				<div className="header">
					<div className="parent">
						<div className="logoparents">
							<Link to="/">
								<img className="logoIcon" alt="" src="/assets/logo.png" />
							</Link>
						</div>
						<Link to="/map" className="b1">
							지도
						</Link>
						<Link to="/gbblist" className="b1">
							곰방봐
						</Link>
						<Link to="/zzim" className="b1">
							찜 목록
						</Link>
						<Link to="/roomout" className="b1">
							방 내놓기
						</Link>
					</div>
					<Link to="/chatlist" className="b2">
						채팅
					</Link>
					<div>반가워요, {userinfo?.name}!</div>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div className="header">
					<div className="parent">
						<div className="logoparents">
							<Link to="/">
								<img className="logoIcon" alt="" src="/assets/logo.png" />
							</Link>
						</div>
						<Link to="/map" className="b1">
							지도
						</Link>
						<Link to="/gbblist" className="b1">
							곰방봐
						</Link>
						<Link to="/zzim" className="b1">
							찜 목록
						</Link>
						<Link to="/roomout" className="b1">
							방 내놓기
						</Link>
					</div>
					{/* <Link to="/chatroom" className='b2'>채팅</Link> */}
					<Link to="/login" className="b2">
						회원가입/로그인
					</Link>
				</div>
			)}
		</div>
	);
};

export default Header;
