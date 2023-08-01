
import "./Signuplogin.module.css";
const Loginpage = () => {

  const Rest_api_key='a20ef37212e1ae86b20e09630f6590ce' //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  const handleLogin = ()=>{
      window.location.href = kakaoURL
  }

  return (  
    <div className='loginpage'>
          <div>카카오톡으로 <b className='b6'>곰방</b> 시작하기</div>
          <div className='b6'>곰방</div>
          <div>
            {/* <a id="kakao-login-btn" href="javascript:loginWithKakao()">
  <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
    alt="카카오 로그인 버튼" onClick={handleLogin} />
</a> */}
            <b className='b6' onClick={handleLogin}>
              카카오톡으로 시작하기
            </b>
          </div>
    </div>
  );
};

export default Loginpage;
