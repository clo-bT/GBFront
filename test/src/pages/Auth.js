import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

export default function Auth() {
    const [c, setcode] = useState('')
    const [id, setid] = useState('')    
    const [shownameform, setshownameform] = useState(false)    
    const [value,iptvalue] = useState('')
    
        const gettoken = async ()=>{
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
                })
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        }

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
                // const response = await axios.post('http://localhost:8080/member/update',null,{params});
                const response = await axios.post('http://localhost:8080/member/update',params,config);
                console.log('success2', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }

        function handleKeyPress(event){
            if (event.key === "Enter" || event.keyCode === 13){
                console.log(value)
                postname(value)
            }
        }
    
    

    return(
        <div>
            <Header/>
            <button onClick={gettoken}>12313</button>
            <div className="auth">
                인가코드 :  {c}
                {id? <div>uuid : {id}</div> :''}
            </div>
                {shownameform&&
                <input 
                type="text" 
                placeholder='이름을 입력하시오' 
                onKeyDown={handleKeyPress} 
                onChange={(event)=>{iptvalue(event.target.value)}} 
                />}
            
        </div>
        
    )
}