import QuotaCards from "./quotacards"
import { useRouter } from "next/router";
import QuotaPosterHeader from "../quotaposterheader";
import { useSelector } from "react-redux";

import { useEffect,useState } from "react";
import axios from "axios";

import io from 'socket.io-client'
import { ChangeColumnSize } from "../helpers/cardrendering";
import { useAppSelector } from "@/store";
export default function QuotaPosts(){
    const router = useRouter();
    const quotaposter_access_token = useAppSelector((state) => state.token.quotaposter_access_token);
    
    const companyredux = useAppSelector((state) => state.token.company);
    const [company,setCompany] = useState(companyredux);

    const [token,setToken] = useState(quotaposter_access_token );
    const [notauthorised,setNotAuthorized] = useState(false);
    const [quotacards,setQuotaCards] = useState<any>([]);
    const [datagetfinished,setGetDataFinsished] = useState(false);
    const [columnsize,setColumnSize] = useState();
    const [quotastatechanged,setQuotaStateChanged] = useState(false)
    const [startget,setStartGet] = useState(false);



    const getCookies = async () => {

    setStartGet(true)

    }
    const startconnection = async ()=> {

            
            const config = {headers: { Authorization: `Bearer ${token}` }};
            const socket:any = io("localhost:5000/", {
                transports: ["websocket"]
            });

        if (datagetfinished === false){
        socket.emit("getquotasws", config);
        }
      socket.on("getquotasws", (data:any) => {
        //console.log(data.data)
        const quota = data.data
        if (quota !== undefined){

        if (quota.message === "all data has been sent." || quota.message === "quoter has not posted first quota yet."){
            console.log(quota.message)
            if (quota.message === "quoter has not posted first quota yet."){
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

    //console.log(quotacards,company,token)
    return(
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <QuotaPosterHeader authed={true}/>

            
            </div>
            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <div style={{marginBottom:"20px"}}>
                            <h2>Your Quotas</h2>
                   
                        </div>
                        {(quotacards.length !== 0 && company !== "" && token !== "")  ?
                    <div style={{columns:`${columnsize} auto`}}>
                        {quotacards.map((card:Object,ind:number) => <QuotaCards setQuotaCards={setQuotaCards} setColumnSize={setColumnSize} quotacards={quotacards} setGetDataFinsished={setGetDataFinsished} setQuotaStateChanged={setQuotaStateChanged} key={ind} quotainfo={card} token={token} company={company} />)}
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