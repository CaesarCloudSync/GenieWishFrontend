import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuotaBrowseCard from "@/pages/quotabrowse/quotabrowsecard";
import QuotaPosterHeader from "@/pages/quotaposterheader";
import ContributorHeader from "@/pages/contributorheader";
import { capitalizeAll } from "@/pages/helpers/text";
import axios from 'axios'
import { useAppSelector } from "@/store";
import { toast } from "react-toastify";
export default function ContributeQuota(){
    const contributor_access_token = useAppSelector((state) => state.token.contributor_access_token);
    const contributorusernameredux = useAppSelector((state) => state.token.contributorusername);
    
    const emailredux = useAppSelector((state) => state.token.email);
    const [contribortorusername,setContributorUsername] = useState(contributorusernameredux)
    const [quotacard,setQuotaCard] = useState();
    const [token,setToken] = useState(contributor_access_token)
    const [email,setEmail] = useState(emailredux)
    
    const [permisionasked,setPermissionAsked] = useState(false)
    const [permissionStatus,setPermissionStatus] = useState("")
    const router = useRouter();
    //amazonai/computer vision/productrecommenders
   
    const quotaurl = router.asPath !== "/contribute/[...contributeurls]" ? router.asPath : ""

    const fetchQuotaCard = async(quotaurl:string) => {
        // TODO Fetch Quota card using url as GET endpoint parameter
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const newquotaurl = quotaurl.replace("/contribute/","")
        const response:any = await axios.get(`http://127.0.0.1:5000/getquotastatuscontrib/${newquotaurl}`,config)
        const fetchedquotacard:any = response.data
        fetchedquotacard.thumbnail = fetchedquotacard.thumbnailfiletype +fetchedquotacard.thumbnail
        //checkAskPermission(quotaurl)
        console.log(fetchedquotacard)
        if (!("message" in fetchedquotacard)){
            if (fetchedquotacard["result"].length > 0){
                setPermissionStatus(fetchedquotacard["result"][0]["permissionstatus"])
            }
            else{
                setPermissionStatus("denied")
            }
            

        }
        setQuotaCard(fetchedquotacard)
    }
    const contributeAskPermission = async (quotaurl:string) => {
        const newquotaurl = quotaurl.replace("/contribute/","")

        if (token === ""){
            router.push("/auth/contributor/signin")
        }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const response:any = await axios.get(`http://127.0.0.1:5000/contributeaskpermission/${newquotaurl}`,config)

        var icontype:any= response.data.message.includes("already") ? "info": "success"
        toast(response.data.message, { hideProgressBar: true, autoClose: 2000,type:icontype})

    }
    const checkAskPermission = async (quotaurl:string) => {
        const newquotaurl = quotaurl.replace("/contribute/","")

        if (token !== ""){
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            //console.log(config)
            //console.log(newquotaurl)

            const response:any = await axios.get(`http://127.0.0.1:5000/checkaskpermission/${newquotaurl}`,config)
            if (response.data.message === "true"){
            setPermissionAsked(true)
            }
        }


    }
    useEffect(() =>{
        if (quotaurl !== "" && quotaurl !== undefined){
            fetchQuotaCard(quotaurl)
        }
    },[quotaurl])
    /*useEffect(()=>{
        if (quotaurl !== ""){
        
        }
    },[])*/

    return(
    <div>
        <div>
            <div style={{display:"flex",flexDirection:"column"}}>
            <ContributorHeader authed={true} notquotabrowse={true}/>

            
            </div>

            <div style={{display:"flex",marginTop:"60px",justifyContent:"center",alignItems:"center"}}>
                <div style={{backgroundColor:"white",width:"1300px",borderRadius:"10px"}}>
                    <div style={{padding:"50px"}}>
                        <div style={{marginBottom:"20px"}}>
                            {quotacard !== undefined && <h2>{quotacard["quoter"]} - {quotacard["quotatitle"]} | {quotacard["quotatype"]}</h2>}
                        </div>
                        {quotacard !== undefined && <QuotaBrowseCard permissionStatus={permissionStatus} quotainfo={quotacard} contributeAskPermission={contributeAskPermission} quotaurl={quotaurl} permisionasked={permisionasked}/>}
                    </div>
                </div>
            </div>
        </div>
    </div>)

}