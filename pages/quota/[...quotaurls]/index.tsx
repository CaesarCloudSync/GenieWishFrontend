import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuotaBrowseCard from "@/pages/quotabrowse/quotabrowsecard";
import QuotaPosterHeader from "@/pages/quotaposterheader";
import { capitalizeAll } from "@/pages/helpers/text";
import axios from 'axios'
export default function QuotaURLS(){
    const [quotacard,setQuotaCard] = useState();
    const router = useRouter();
    //amazonai/computer vision/productrecommenders
   
    const quotaurl = router.asPath !== "/quota/[...quotaurls]" ? router.asPath : ""
    
    const fetchQuotaCard = async(quotaurl:string) => {
        // TODO Fetch Quota card using url as GET endpoint parameter

        const newquotaurl = quotaurl.replace("/quota/","")
        const response:any = await axios.get(`http://127.0.0.1:5000/getquota/${newquotaurl}`)
        const fetchedquotacard:any = response.data
        fetchedquotacard.thumbnail = fetchedquotacard.thumbnailfiletype +fetchedquotacard.thumbnail
        setQuotaCard(fetchedquotacard)
    }

    useEffect(() =>{
        if (quotaurl !== "" && quotaurl !== undefined){
            fetchQuotaCard(quotaurl)
        }
    },[quotaurl])
    return(
    <div>
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <QuotaPosterHeader/>

            
            </div>
            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <div style={{marginBottom:"20px"}}>
                            {quotacard !== undefined && <h2>{quotacard["quoter"]} - {quotacard["quotatitle"]} | {capitalizeAll(quotacard["quotatype"])}</h2>}
                        </div>
                        {quotacard !== undefined && <QuotaBrowseCard quotainfo={quotacard} />}
                    </div>
                </div>
            </div>
        </div>
    </div>)

}