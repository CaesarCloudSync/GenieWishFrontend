import { useRouter } from "next/router"
import Auth from "../auth";
export default function UserAuth(){
    const router = useRouter();
    if (router.asPath === "/auth/[usertyper]"){
        return(
            <div></div>
        )
    }
    if (router.asPath === "/auth/contributor/signin"){
    const authtype = "signin"
    const usertype = router.asPath.replace("/auth","").replaceAll("/","").replace(authtype,"")
    return(
        <Auth usertype={usertype} authtype={authtype}></Auth>

    )
    }
    else if (router.asPath === "/auth/quotaposter/signin"){
        const authtype = "signin"
        const usertype = router.asPath.replace("/auth","").replaceAll("/","").replace(authtype,"")
        return(
            <Auth usertype={usertype} authtype={authtype}></Auth>
        )
    }
    else  if (router.asPath === "/auth/contributor/signup"){
        const authtype = "signup"
        const usertype = router.asPath.replace("/auth","").replaceAll("/","").replace(authtype,"")
        return(
            <Auth usertype={usertype} authtype={authtype}></Auth>
    
        )
        }
    else if (router.asPath === "/auth/quotaposter/signup"){
        const authtype = "signup"
        const usertype = router.asPath.replace("/auth","").replaceAll("/","").replace(authtype,"")
        return(
            <Auth usertype={usertype} authtype={authtype}></Auth>
        )
    }
    

}