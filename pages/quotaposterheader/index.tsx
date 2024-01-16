import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
export default function QuotaPosterHeader(props:any){
    const router = useRouter();
    const currentpath = router.asPath;
    const authed = props.authed
    return(
        <div style={{display:"flex",justifyContent: "flex-end",gap:"30px",padding:"30px"}} className="site-header-inner">
                        
        <div style={{order: "-1",
        fontSize: "3em",
        position: "absolute",
        top: "35px",
        left: "10%"}} className='site-logo'>
            <a href="/"><img style={{height: "100px",width: "130px"}} className='site-logo-image' src="/homepage/CaesarAILogo.png" alt="Logo"></img></a>
        </div>

        {
            props.notonquotaposts === true && <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push("/quotaposts")}}><strong >Quota Posts</strong></a>
        }
        <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push("/auth/contributor/signin")}}><strong >Contribute</strong></a>
        {currentpath === "/postquota" ?
        <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push("/quotaposts")}}><strong >Manage Quotas</strong></a>
        :
        <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' onClick={() => {router.push("/postquota")}}><strong >Post Quota</strong></a>
        }

        {authed !== undefined && <a style={{position: "relative",top:"30px",fontSize:"25px",textDecoration: "none",color: "white",cursor:"pointer"}} className='site-header-item' ><AccountCircleIcon style={{fontSize:"35px"}}/></a>
        }

        
        

</div>
    )
}