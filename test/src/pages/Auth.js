import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

export default function Auth() {
    const [c, setcode] = useState('')    
    const [accessToken,setaccessToken] =useState('')
    
    
    useEffect(()=>{
        
        const gettoken = async ()=>{
            const code = new URL(window.location.href).searchParams.get("code");
            setcode(code)
            const Rest_api_key='a20ef37212e1ae86b20e09630f6590ce' //REST API KEY
            const data ={
                grant_type: 'authorization_code',
                client_id :  Rest_api_key,
                redirect_uri :'http://localhost:3000/auth',
                code
            }
            const headers = {
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
            }
            const queryString = Object.keys(data)
            .map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k]))
            .join('&')
            
            try{        
                await axios.post("https://kauth.kakao.com/oauth/token",queryString
                ,headers)
                .then(function(r){
                    console.log('tokkensuccess',r.data)
                    setaccessToken(r.data.access_token)
                    // getUserInfo(r.data.access_token)
                    getUserInfo('f9223e4dda8be0f6be60acdb05638277')
                })
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        }

        const getUserInfo = async (at)=>{
            // const headers = {
            //     'Authorization' : 'Bearer '+ at,
            // }
            // console.log(headers)
            // // 엑세스 토큰 헤더에 담기

            // // 카카오 사용자 정보 조회
            // await axios.get("https://kapi.kakao.com/v2/user/me", headers)
            // .then(function(r){console.log(r)})
            // .catch(function(error){console.error('error',error)})
            
            
            
            // id, email 추출
            // return {id:result.id,email:result.kakao_account.email}

            const headers = {
                'Authorization': 'KakaoAK '+ at,
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
            const params = {
                'target_id_type': 'user_id',
                'target_id' : 2943193607
            }
            await axios.get("https://kapi.kakao.com/v2/user/me", {params:params,headers:headers})
            .then(function(r){
                console.log(r)
                setcode(r.data.properties.nickname)
            })

        }



        gettoken()

    },[])
    
    

    return(
        <div>
            <Header/>
            <div className="auth">
                인가코드 :  {c}
            </div>
            <div>
                토큰정보 : {accessToken}
            </div>
        </div>
        
    )
}