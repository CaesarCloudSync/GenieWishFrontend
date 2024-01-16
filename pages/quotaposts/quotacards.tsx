import { use, useState } from 'react';
import { Button } from '@mui/material';
import ConvertBase64 from '../helpers/base64';
import UploadIcon from '@mui/icons-material/Upload';
import { useRouter } from 'next/router';
import NotesIcon from '@mui/icons-material/Notes';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ChangeColumnSize } from '../helpers/cardrendering';
export default function QuotaCards(props:any){
    const [postquota,setPostQuota] = useState(props.postquota);
    const company = props.company
    const token = props.token
    const setQuotaStateChanged = props.setQuotaStateChanged
    const setGetDataFinsished = props.setGetDataFinsished


    

    const [quotainfo,setQuotaInfo] = useState(props.quotainfo)
    const [title,setTitle] = useState("");
    const [thumbnail,setThumbnail] = useState(null);
    const [description,setDescription] = useState("");
    const [thumbnailfilename,setThumbNailFilename] = useState("");
    const [thumbnailfiletype,setThumbNailFileType] = useState();
    const [finishfieldserror,setFinishFieldsError] = useState(false);
    const [quotatype,setQuotaType] = useState("")
    const [visibility,setVisibility] = useState("public");
    const router = useRouter();
    const quotainfourl = quotainfo !== undefined && quotainfo["quoter"].replaceAll(" ","") + "/"   + quotainfo["quotatitle"].replaceAll(" ","") + "/" + quotainfo["quotatype"].replaceAll(" ","")
    const handleImage = (e:any) =>{
        setThumbNailFilename(e.target.files[0].name)
        setThumbNailFileType(e.target.files[0].type)
        ConvertBase64(e.target.files[0],setThumbnail)
        
    } 
    const submitQuota = async () =>{
        setFinishFieldsError(false)
        if (title === "" || quotatype === "" || thumbnail === null || description === ""){
            setFinishFieldsError(true)

        }
        else{
            const quotajson:any = {"quoter":company,"quotatitle":title,"quotatype":quotatype,"thumbnailfilename":thumbnailfilename,"thumbnail":thumbnail,"description":description,"visibility":visibility}

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const response:any = await axios.post(`http://localhost:5000/postquota`, quotajson,config); // Send login post request.
            //console.log(response.data)
            if (response.data.message !== undefined && response.data.message === "quota was posted."){
                    router.push("/quotaposts")
            }

            // TODO Post new quota here.

        }

    }
    const changeQuota = async () =>{
        setGetDataFinsished(false)
        const quotajson:any = {"quotatitle":title,"quotatype":quotatype,"thumbnailfilename":thumbnailfilename,"thumbnail":thumbnail,"description":description,"visibility":visibility}
        const quotakeys = Object.keys(quotajson)
        const quotavalues:any = Object.values(quotajson)
        const emptyvalues = []
        for (let i = 0;i < quotavalues.length;i++){
            if(quotavalues[i] === "" || quotavalues[i] === null){
                emptyvalues.push(quotakeys[i])

            }

        }
        if (emptyvalues.length < 6 ){
            emptyvalues.map((val)=> {delete quotajson[val]})
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            quotajson["previousquota"] = quotainfo

            const old_quota = quotajson["previousquota"]

            quotajson["quotatitle"] = emptyvalues.includes("quotatitle") ? quotajson["previousquota"]["quotatitle"]  : title 
            quotajson["quotatype"] = emptyvalues.includes("quotatitle") ? quotajson["previousquota"]["quotatype"] : quotatype   



            
            const response:any = await axios.put(`http://localhost:5000/updatequota`, quotajson,config); // Send login post request.
            if (response.data.message === "quota was updated."){
                for (const key in quotajson) {
                    if (key != "previousquota"){
                        old_quota[key] = quotajson[key]
                        
                    }
    
                    
                }
                setQuotaInfo(old_quota)
                setPostQuota(undefined)
            }

        }
    }
    const deleteQuota = async () => {
        // TODO Delete quota here using API
        setGetDataFinsished(false)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const responsedel = await axios.delete(`http://localhost:5000/deletequota/${quotainfourl}`,config)
        if (responsedel.data.message === "quota was deleted."){
            
            const newquotacards = props.quotacards.filter((val:any)=>{return(val !== quotainfo)})
            if (newquotacards.length === 0){
                props.setQuotaCards([])
            }
            else{
                props.setQuotaCards(newquotacards)
                const column = ChangeColumnSize(newquotacards)
                props.setColumnSize(column)
            }


            
        }
    
    }
    return (

        <div style={{display:"flex",flexDirection:"column",width:"100%",marginBottom:"30px"}}>

        <div className="quota-titles" style={{backgroundColor:"white",minHeight:"50px",width:"100%",border:"1px solid black",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
            <div style={{padding:"10px"}}>
                
                {
                    /* Displaying Quotata */
                postquota === undefined ?
                quotainfo !== undefined && <div>{quotainfo["quoter"]} - {quotainfo["quotatitle"]} | {quotainfo["quotatype"]}
                
                <button style={{position:"relative",left:"10px"}} onClick={() => {setPostQuota(false)}} >Edit</button>
                {quotainfo["visibility"] === "public" ?<LockOpenIcon  style={{position:"relative",top:"8px",left:"15px"}}></LockOpenIcon>:
                    <LockIcon  style={{position:"relative",top:"8px",left:"15px"}}></LockIcon>}
                    
                </div>
                :
                /* Create or  Edit Quota */
                <div >
                    <div style={{display:"flex",gap:"3px"}}>
                    <input value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="Title:"></input>
                    {postquota === false && <button onClick={() => {setPostQuota(undefined)}} >Revert</button>}
                    </div>
                    <input value={quotatype} onChange={(e) => {setQuotaType(e.target.value)}} placeholder="AI Project Type:"></input>
                    {visibility === "public" ?<LockOpenIcon onClick={() => {setVisibility("private")}} style={{position:"relative",top:"8px",left:"15px",cursor:"pointer"}}></LockOpenIcon>:
                    <LockIcon onClick={() => {setVisibility("public")}} style={{position:"relative",top:"8px",left:"15px",cursor:"pointer"}}></LockIcon>}
                    
                    
                </div>
                }
            </div>
        
        </div>
        
        <div className="quota-images" style={{backgroundColor:"white",height:"400px",width:"100%",border:"1px solid black"}}>
            { postquota === undefined ?
            <a onClick={()=> {router.push(`/quota/${quotainfourl}`)}}  style={{cursor:"pointer"}}>
            
            {quotainfo !== undefined && <img style={{width:"100%",height:"100%"}} src={quotainfo["thumbnail"]} alt="thumbnail"></img>}
            </a>
            :
            thumbnail !== null ?
            <img style={{width:"100%",height:"100%"}} src={thumbnail} alt="thumbnail"></img>
            :
            <div>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div style={{position:"relative",top:"125px"}}>
                        <div style={{display:"flex",flexDirection:"column"}}>
                        
                        <input accept="image/png, image/gif, image/jpeg, image/svg+xml" onChange={handleImage} type="file" id="actual-btn" hidden/>
                        <label htmlFor="actual-btn">
                        <UploadIcon  style={{position:"relative",left:"40px",width:"40px",height:"40px",cursor:"pointer"}}></UploadIcon>
                        </label>
                        <p style={{fontSize:"10px"}}>Upload Thumbnail Image</p>
                        </div>
                    </div>
                </div>
            </div>
            }


        </div>
        

        <div className="quota-descriptions" style={{backgroundColor:"white",minHeight:"75px",width:"100%",border:"1px solid black",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}>
            
            { postquota === undefined ?
            <div style={{padding:"10px"}}>
                <p style={{wordWrap: "break-word"}}>
                {quotainfo !== undefined && quotainfo["description"]}
                </p>
     
            <div style={{display: "flex",justifyContent: "flex-end",gap:"10px"}}>

                <DeleteIcon onClick={() => {deleteQuota()}} style={{position:"relative",bottom:"15px",right:"0px",width:"50px",height:"50px",cursor:"pointer"}} ></DeleteIcon>
                <NotesIcon onClick={() => {router.push(`/quotacontributions/${quotainfourl}`)}} style={{position:"relative",bottom:"15px",right:"0px",width:"50px",height:"50px",cursor:"pointer"}}></NotesIcon>
            </div>
            </div>
            :
            <div style={{padding:"20px",minHeight: postquota === true ? "200px" :"auto"}}>

                <textarea rows={postquota === true ? 20 : 3}   defaultValue={description} onChange={(e:any) => {setDescription(e.target.value)}} style={{width:"100%",height:"100%"}}>
                
                </textarea>
               
                <div style={{display: "flex",justifyContent: "flex-end",gap:"10px"}}>
                <Button onClick={() => {setThumbnail(null)}} style={{position:"relative",top:"3px",right:"0px"}} variant="contained">
                    Remove Image
                </Button>
                {quotainfo === undefined ?
                <Button onClick={() => {submitQuota()}} style={{position:"relative",top:"3px",right:"0px"}} variant="contained">
                     Submit 
                </Button>
                : 
                <Button onClick={() => {changeQuota()}} style={{position:"relative",top:"3px",right:"0px"}} variant="contained">
                Change
                </Button>
                }
                </div>
                {finishfieldserror === true && <p style={{color:"red"}}>Please fill in all fields.</p>}

            </div>
            }
            </div>
        </div>
    
    
    )
}
