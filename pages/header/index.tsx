import CaesarAILogo from './CaesarAILogo.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Header(){
    const router = useRouter();
    return (
        <header style={{padding: "24px 0"}} className="site-header">
            <div style={{maxWidth: "1600px"}} className="container">
                <div style={{display:"flex",justifyContent: "flex-end",gap:"30px"}} className="site-header-inner">
                    
                    <div style={{order: "-1",
                    fontSize: "3em",
                    position: "absolute",
                    top: "35px",
                    left: "20%"}} className='site-logo'>
                        <a href="/"><img style={{height: "100px",width: "130px"}} className='site-logo-image' src="/homepage/CaesarAILogo.png" alt="Logo"></img></a>
                    </div>
                    <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push('/auth/contributor/signin')}}><strong >Contribute</strong></a>
                    <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push('/auth/quotaposter/signin')}}><strong >Post Quota</strong></a>
                    <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push("/contactus")}}><strong >Contact Us</strong></a>
                    
                </div>
            </div>
        </header>
    )

}