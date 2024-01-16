import QuotaCards from "../quotaposts/quotacards"
import { useRouter } from "next/router";

import ContributorHeader from "../contributorheader";
import { useSelector } from "react-redux";
import QuotaBrowseCard from "../quotabrowse/quotabrowsecard";
import { useEffect,useState } from "react";
import axios from "axios";

import io from 'socket.io-client'
import { ChangeColumnSize } from "../helpers/cardrendering";
import { useAppSelector } from "@/store";
export default function QuotaPosts(){
    const router = useRouter();
    const contributor_access_token = useAppSelector((state) => state.token.contributor_access_token);
    

    const contributorusernameredux = useAppSelector((state) => state.token.contributorusername);
    
    const [contributorusername,setContributorUsername] = useState(contributorusernameredux)

    const [token,setToken] = useState(contributor_access_token);
    const [notauthorised,setNotAuthorized] = useState(false);
    const [quotacards,setQuotaCards] = useState<any>([]);
    const [datagetfinished,setGetDataFinsished] = useState(false);
    const [columnsize,setColumnSize] = useState();
    const [quotastatechanged,setQuotaStateChanged] = useState(false)
    const [startget,setStartGet] = useState(false);
    const [contributorhash,setContributorHash] = useState("")




    const getCookies = async () => {

    setStartGet(true)

    }
    const startconnection = async ()=> {

            
            const config = {headers: { Authorization: `Bearer ${token}` }};
            console.log(config)
            const socket:any = io("localhost:5000/", {
                transports: ["websocket"]
            });

        if (datagetfinished === false){
        socket.emit("getcontribquotasws", config);
        }
      socket.on("getcontribquotasws", (data:any) => {
        //console.log(data.data)
        const quota = data.data
        if (quota !== undefined){

        if (quota.message === "all data has been sent." || quota.message === "first contribution has not been permitted."){
            console.log(quota.message)

            setContributorHash(quota.contributor)
            if (quota.message === "first contribution has not been permitted."){
                setQuotaCards([])
                            setGetDataFinsished(true)
            socket.disconnect()
            setQuotaStateChanged(false)
            }
            setGetDataFinsished(true)
            socket.disconnect()
            setQuotaStateChanged(false)


        }
        else {
            
        if (quota !== undefined){
        //console.log(quota)
        quota.thumbnail = quota.thumbnailfiletype + quota.thumbnail
        
 
        quotacards.push(quota)}
        }
      }}
      )
    

    }
    useEffect(()=>{
        getCookies();
    },[])
    useEffect(()=>{
    
        if (startget !== false){
        startconnection()
        setGetDataFinsished(false)

        }
        if ( quotastatechanged === true){

            startconnection()
            setGetDataFinsished(false)
        }
    },[startget,quotastatechanged])
    useEffect(()=>{
        if (datagetfinished === true){
            const column = ChangeColumnSize(quotacards)
            setColumnSize(column)
        }

    },[datagetfinished])

    //console.log(quotacards,email,token)
    return(
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
            <ContributorHeader authed={true} notquotabrowse={true}/>


            
            </div>
            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <div style={{marginBottom:"20px"}}>
                            <h2>Your Quotas</h2>
                            
                   
                        </div>
                        {(quotacards.length !== 0 && contributorusername !== "" && token !== "")  ?
                    <div style={{columns:`${columnsize} auto`}}>
                        {quotacards.map((card:any,ind:number) => <QuotaBrowseCard contributorhash={contributorhash} contributoraccount={"contributoraccount"} key={ind} quotainfo={card} permissionStatus={card.permissionstatus} />)}
                    </div>
                    :
                    <div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"30px"}}>
                            No Quotas have been posted
                            <a style={{backgroundColor:"#9b6e3c",borderRadius:"10px",cursor:"pointer"}} onClick={() => {router.push("/postquota")}}>
                                <p style={{padding:"6px",color:"white",fontSize:"20px"}}>Create Quota</p>
                            </a>

                        </div>
                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}