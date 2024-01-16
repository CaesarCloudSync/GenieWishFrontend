import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel'
import axios from 'axios';
import { useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from "next/link"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
export default function ContribStatus(props:any){
    //console.log(props.quotaurl)
    const [permstatus,setPermStatus] = useState(props.contributions["permissionstatus"])
    const changepermissionstatus = async (quotaurl:string,contributor:string,status:string) =>{
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };
        const newquotaurl = quotaurl.replace("/quotacontributions/","")
        const response:any = await axios.put(`http://127.0.0.1:5000/changepermissionstatus`,{"url":newquotaurl,"contributor":contributor,"status":status},config)
        const fetchedquotacard:any = response.data

        setPermStatus(status)


    }
    return(
        <div >
        {permstatus !== "denied" && 
        <div style={{display:"flex",gap:"10px"}}>
        <p >Contributor -</p>
        <p>{props.contributions["contributor"]} </p>
        <div>{permstatus === "pending"  ?<div style={{display:"flex",gap:"5px",position:"relative",top:"12px"}}>
            <CheckCircleIcon style={{cursor:"pointer",color:"green"}} onClick={()=> {changepermissionstatus(props.quotaurl,props.contributions["contributor"],"accepted")}}/>
            <CancelIcon style={{cursor:"pointer",color:"red"}} onClick={()=> {changepermissionstatus(props.quotaurl,props.contributions["contributor"],"denied")}}/></div>
            :
            <div style={{display:"flex",gap:"5px",position:"relative",top:"12px"}}>
                <VerifiedIcon style={{color:"blue"}}/>
                <CancelIcon style={{cursor:"pointer",color:"red"}} onClick={()=> {changepermissionstatus(props.quotaurl,props.contributions["contributor"],"denied")}}/>
                <Link style={{cursor:"pointer"}} href={`/caesartorrent/${props.quotaurl.replace("/quotacontributions/","")}?j=${props.token}?c=${props.contributions["contributor"]}`} target="_blank" rel="noopener noreferrer" >
                <ArrowCircleRightIcon style={{color:"black"}} />
                </Link>

            </div>}
        </div>
        </div>
        }
        

    </div>

    )
}