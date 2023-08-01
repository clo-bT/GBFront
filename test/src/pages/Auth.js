import Header from '../components/Header';

export default function Auth() {
    const code = new URL(window.location.href).searchParams.get("code");
    return (
        <div>
            <Header/>
            <div className="auth">
                인가코드 :  {code}
            </div>
        </div>
        
    )
}