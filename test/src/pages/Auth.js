import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

export default function Auth() {
    const [c, setcode] = useState('')
    const [id, setid] = useState('')    
    const [shownameform, setshownameform] = useState(false)    
    const [userinfo,setuserinfo] = useState({})
    

    
    useEffect(() => {
        async function getid() {
            const code = new URL(window.location.href).searchParams.get("code");
            setcode(code)
            // window.location.href = 'http://localhost:3000/auth'
            
            try{        
                await axios.get(`http://localhost:8080/member/login?code=${code}`)
                .then(function(r){
                    console.log('success',r.data)
                    sessionStorage.setItem("isAuthorized", "true")
                    if(r.data.code===200){
                        setshownameform(true)
                        setid(r.data.data.id)
                    }
                    if(r.data.data.member){
                        setuserinfo(r.data.data.member);
                        setshownameform(false)
                        window.location.href = 'http://localhost:3000/'

                    }
                })
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        }
        getid()
    },[])


        const postname = async (name) => {
            const params = {
                'id':id,
                'name':name
            }  
            const config = {
                headers: {
                'Content-Type': 'application/json'
                }
            }
            try {
                const response = await axios.post('http://localhost:8080/member/update',params,config);
                console.log('success2', response.data);
                sessionStorage.setItem("isAuthorized", "true");
                if(response.data.data.member){
                    setuserinfo(response.data.data.member);
                    setshownameform(false);
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

        function handleKeyPress(event){
            if (event.key === "Enter" || event.keyCode === 13){
                postname(event.target.value)
            }
        }
    
    

    return(
        <div>
            <Header/>
            <div className="auth">
                인가코드 :  {c}
                {id? <div>uuid : {id}</div> :''}
            </div>
                {shownameform&&
                <input 
                type="text" 
                placeholder='이름을 입력하시오' 
                onKeyDown={handleKeyPress} 
                />}
            <div>
                {userinfo && Object.entries(userinfo).map((value,index)=>{return <div key={index}>{value[0]}: {value[1]}</div>})}
            </div>
            <div>
            </div>
        </div>
        
    )
}