import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { object } from 'prop-types';

export default function Auth() {
    const [c, setcode] = useState('')
    const [id, setid] = useState('')    
    const [shownameform, setshownameform] = useState(false)    
    const [userinfo,setuserinfo] = useState({})
    
    useEffect(() => {
        async function getid() {
            const code = new URL(window.location.href).searchParams.get("code");
            setcode(code)
            try{        
                await axios.get(`http://localhost:8080/member/login?code=${code}`)
                .then(function(r){
                    console.log('success',r.data)
                    if(r.data.code===200){
                        setshownameform(true)
                        setid(r.data.data.id)
                    }
                    if(r.data.data.member){setuserinfo(r.data.data.member)}
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
                if(response.data.data.member){console.log(response.data.data.member)}
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
                {userinfo && Object.entries(userinfo)
                }
            </div>
        </div>
        
    )
}