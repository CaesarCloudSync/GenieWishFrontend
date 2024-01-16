
import QuotaPosterHeader from "../quotaposterheader"
import QuotaCards from "../quotaposts/quotacards"
import { useEffect,useState } from "react"

import { useAppSelector } from "@/store"
export default function PostQuota(){
    const quotaposter_access_token = useAppSelector((state) => state.token.quotaposter_access_token);
    
    const companyredux = useAppSelector((state) => state.token.company);
    const [company,setCompany] = useState(companyredux);
    const [token,setToken] = useState(quotaposter_access_token);

    return(
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
                <QuotaPosterHeader authed={true}/>

            
            </div>
            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <div style={{marginBottom:"20px"}}>
                            <h2>Create Quota</h2>
                        </div>
                        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            {(company !== "" && token !== "") && <QuotaCards postquota={true} token={token} company={company}/> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}