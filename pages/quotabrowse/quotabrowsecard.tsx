import { capitalizeAll } from "../helpers/text"
import { useRouter } from "next/navigation"
import { Button } from "@mui/material";
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel'
import Link from "next/link";
export default function QuotaBrowseCard(props:any){
    const router:any = useRouter();
    const quotainfo:any = props.quotainfo
    const quotainfourl = quotainfo["quoter"].replace(" ","") + "/" + quotainfo["quotatitle"].replace(" ","") + "/" + quotainfo["quotatype"].replace(" ","") 
    return(
        <div style={{display:"flex",flexDirection:"column",width:"100%",marginBottom:"30px"}}>

        <div className="quota-titles" style={{backgroundColor:"white",height:"50px",width:"100%",border:"1px solid black",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
            <div style={{padding:"10px"}}>

                {quotainfo !== undefined && <div>{quotainfo["quoter"]} - {quotainfo["quotatitle"]} | {capitalizeAll(quotainfo["quotatype"])}</div>}

            </div>
        
        </div>
        
        <div className="quota-images" style={{backgroundColor:"white",height:"400px",width:"100%",border:"1px solid black"}}>
            {props.contributoraccount  !== undefined && props.permissionStatus === "accepted" ?
                        <Link href={`/caesarseed/${quotainfourl}?c=${props.contributorhash}`} target="_blank" rel="noopener noreferrer" style={{cursor:"pointer"}}>
                        {quotainfo !== undefined && <img style={{width:"100%",height:"100%"}} src={quotainfo["thumbnail"]} alt={quotainfo["thumbnailfilename"]}></img>}
            
                        </Link>
                        :
                        <a onClick={()=> {router.push(`/quota/${quotainfourl}`)}}style={{cursor:"pointer"}}>
                        {quotainfo !== undefined && <img style={{width:"100%",height:"100%"}} src={quotainfo["thumbnail"]} alt={quotainfo["thumbnailfilename"]}></img>}
            
                        </a>
            }

        </div>
        

        <div className="quota-descriptions" style={{backgroundColor:"white",minHeight:"75px",width:"100%",border:"1px solid black",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
            <div style={{padding:"10px"}}>
                <p style={{wordWrap: "break-word"}}>
                {quotainfo !== undefined && quotainfo["description"]}
                </p>
                <div style={{display: "flex",justifyContent: "flex-end",gap:"10px"}}>
                { props.permissionStatus === "" ||  props.permissionStatus === undefined  ? 
                props.quotaurl !== undefined ?
               !props.quotaurl.includes("quotacontributions") &&
               props.contributeAskPermission !== undefined &&

               <Button onClick={() => props.contributeAskPermission(props.quotaurl)} style={{position:"relative",top:"3px",right:"0px"}} variant="contained">
               Ask Permission
           </Button>

           :
            <Button onClick={() => {router.push(`/contribute/${quotainfourl}`)}} style={{position:"relative",top:"3px",right:"0px"}} variant="contained">
                Contribute
            </Button>
                :

                props.permissionStatus === "accepted"? <VerifiedIcon style={{fontSize:"35px",color:"blue"}}/>
                :
                props.permissionStatus === "pending"? <PendingIcon style={{fontSize:"35px"}}/>
                :
                props.permissionStatus === "denied" &&<CancelIcon style={{fontSize:"35px",color:"red"}}/>

                
                }
                </div>
     

            </div>

            </div>
        </div>
    
    
    )
}