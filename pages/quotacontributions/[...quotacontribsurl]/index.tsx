import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuotaBrowseCard from "@/pages/quotabrowse/quotabrowsecard";
import QuotaPosterHeader from "@/pages/quotaposterheader";
import { capitalizeAll } from "@/pages/helpers/text";
import { useAppSelector } from "@/store";
import axios from 'axios'
import ContribStatus from "../contribstatus";
export default function QuotaURLS(){
    const [quotacard,setQuotaCard] = useState();
    const router = useRouter();
    const quotaposter_access_token = useAppSelector((state) => state.token.quotaposter_access_token);
    const companyredux = useAppSelector((state) => state.token.company);
    const [company,setCompany] = useState(companyredux);
    const [token,setToken] = useState(quotaposter_access_token);
    const [contributorstatuses,setContributorStatuses] = useState([])

    //amazonai/computer vision/productrecommenders
   
    const quotaurl = router.asPath !== "/quotacontributions/[...quotacontribsurl]" ? router.asPath : ""
    
    const fetchQuotaCard = async (quotaurl:string) => {
        // TODO Fetch Quota card using url as GET endpoint parameter
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const newquotaurl = quotaurl.replace("/quotacontributions/","")
        const response:any = await axios.get(`http://127.0.0.1:5000/getquotastatusposter/${newquotaurl}`,config)
        const fetchedquotacard:any = response.data
        
        if ("result" in fetchedquotacard){
            setContributorStatuses(fetchedquotacard["result"])
            fetchedquotacard.thumbnail = fetchedquotacard.thumbnailfiletype +fetchedquotacard.thumbnail
            setQuotaCard(fetchedquotacard)
            }
            else{
                if (fetchedquotacard["message"] === "permission doesn't exist"){
                    fetchedquotacard.thumbnail = fetchedquotacard.thumbnailfiletype +fetchedquotacard.thumbnail
                    setQuotaCard(fetchedquotacard)


                }
                else{
                    console.log(fetchedquotacard)
                }
                
            }

        
    }


    useEffect(() =>{
        if (quotaurl !== "" && quotaurl !== undefined){
            fetchQuotaCard(quotaurl)
            //
            // get contribution permisions
        }
    },[quotaurl])
    return(
    <div>
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <QuotaPosterHeader authed={true} notonquotaposts={true}/>

            
            </div>
            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <div style={{marginBottom:"20px"}}>
                            {quotacard !== undefined && <h2>{quotacard["quoter"]} - {quotacard["quotatitle"]} | {quotacard["quotatype"]}</h2>}
                        </div>
                        {quotacard !== undefined && <QuotaBrowseCard quotainfo={quotacard} quotaurl={quotaurl} />}
                        <div>
                            <h3>Accept or Decline Contribution Permission</h3>
                            {contributorstatuses.length !== 0 ?
                            contributorstatuses.map((contributions,ind) => {
                                return(
                                    <ContribStatus  key={ind} token={token} quotaurl={quotaurl} contributions={contributions} ind={ind}/>
                                )
                            })
                            :
                            <div>No Contributions to accept or decline.</div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)

}