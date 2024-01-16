import ContributorHeader from "../contributorheader";
import QuotaBrowseCard from "./quotabrowsecard"
import Select from 'react-select'
import { useEffect,useState} from "react"
import { ChangeColumnSize } from "../helpers/cardrendering";

import { io } from "socket.io-client";
import axios from "axios";
import { capitalizeAll,capitalize } from "../helpers/text";
import { useAppSelector } from "@/store";
export default function QuotaBrowse(){
    const contributor_access_token = useAppSelector((state) => state.token.contributor_access_token);
    
    const emailredux = useAppSelector((state) => state.token.email);
    const contributorusernameredux = useAppSelector((state) => state.token.contributorusername);
    const [contribortorusername,setContributorUsername] = useState(contributorusernameredux)
    
    const [quotatypes,setQuotaTypes] = useState<Array<Object>>();
    const [quotacolumnsize,setQuotaColumnSize] = useState();
    const [email,setEmail] = useState(emailredux);
    const [token,setToken] = useState(contributor_access_token);
    const [notauthorised,setNotAuthorized] = useState(false);
    const [quotacards,setQuotaCards] = useState<any>([]);
    const [datagetfinished,setGetDataFinsished] = useState(false);
    const [quotacardsfetched,setQuotaCardsFetched] = useState<any>([])
    const [startget,setStartGet] = useState(false)




    const getCookies = async () => {

        setStartGet(true)
    }
    const startconnection = async ()=> {

            
            const config = {headers: { Authorization: `Bearer ${token}` }};
            const socket:any = io("localhost:5000/", {
                transports: ["websocket"]
            });

        if (datagetfinished === false){
        socket.emit("getquotasbrowsews", config);
        }
      socket.on("getquotasbrowsews", (data:any) => {
        //console.log(data.data)
        const quota = data.data

        if (quota.message === "all data has been sent."){

            setGetDataFinsished(true)
            const column = ChangeColumnSize(quotacardsfetched)
            setQuotaColumnSize(column)
            const defaultselect = "computer vision"
            filterQuotaCards(defaultselect)
            fetchQuotaTypes()
            socket.disconnect()


        }
        else {
            
        if (quota !== undefined){
        //console.log(quota)
        quota.thumbnail = quota.thumbnailfiletype + quota.thumbnail
        
 
        quotacardsfetched.push(quota)}
        }
      });

    }
    useEffect(()=>{
        getCookies();
    },[])
    useEffect(()=>{
        if (startget !== false){
            //console.log("hi")
        startconnection()
    

        }
    },[startget])


  
    const fetchQuotaTypes = async () => {
        const response:any = await axios.get("http://localhost:5000/getquotatypes")
 
        if (response.data.quotatypes !== undefined){
        const quotatypesarray = response.data.quotatypes
        const quotatypes = quotatypesarray.map((quotaty:any)=>{let quotatype = quotaty.quotatype;let capitalizefunc = quotatype.includes(" ") ? capitalizeAll : capitalize;return({value:quotatype,label:capitalizefunc(quotatype)})})

        // TODO Fetch all project types using API
        setQuotaTypes(quotatypes)
    }

    }
    const filterQuotaCards = (quotatypeselect:string) => {
        // TODO send quotatypeselect as websocket payload and use to filter for quota cards using quotatype

        function quotaFilter(quota:any){
            if(quota.quotatype === quotatypeselect){
                return quota
            }

        }
        console.log(quotacardsfetched)
        const filteredquotacards  = quotacardsfetched.filter(quotaFilter)

        const quotapop2 = filteredquotacards.length % 2 
        const quotapop3 = filteredquotacards.length % 3
        const quotacolumn:any = (quotapop3 === 0 && 3) || (quotapop2 === 0 && 2) || (quotapop2 !== 0 && quotapop2 ) || (quotapop3 !== 0 && quotapop3 )
  

        setQuotaColumnSize(quotacolumn)
        setQuotaCards(filteredquotacards )
    }

    

    return (
<div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <ContributorHeader authed={true}/>

            
            </div>
            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <Select options={quotatypes} onChange={(select:any) => {filterQuotaCards(select.value)}}/>
                        <div style={{marginBottom:"20px"}}>
                            <h2>Browse Quotas</h2>
                        </div>
                    {quotacards !== undefined && quotacards.length !== 0 ?
                    <div style={{columns:quotacolumnsize}}>
                        {quotacards.map((card:Object,ind:number) => <QuotaBrowseCard key={ind} quotainfo={card} />)}
                    </div>
                    :
                    <div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"30px"}}>
                            No Quotas Found.

                        </div>
                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}