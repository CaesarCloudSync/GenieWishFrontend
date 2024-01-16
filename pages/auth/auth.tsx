"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
//import LoadingSpinner from "../animations/Loadingspinner";
import Header from '../header';
import styles from "./signin.module.css"
//import Policies from "../homepage/components/policies";
import Head  from "next/head";
import useMediaQuery from '@mui/material/useMediaQuery'
import LoadingSpinner from "../animations/LoadingSpinner";
import { capitalize } from '../helpers/text';

import axios from 'axios';

"use client";
import { useAppDispatch } from '@/store';
import { setContributorAccessToken,setQuotaPosterAccessToken,setReduxCompany,setReduxContributorUsername,setReduxEmail } from '@/store/slices/tokensSlice';

//import './signin.css'
// https://javascript.plainenglish.io/creating-a-sign-up-form-in-react-with-typescript-516b1a172913
// TODO Next to collect specific data from database send requests to api with jwttoken in the axios header.






export default function Auth(props:any){
    const usertype = props.usertype
    const authtype = props.authtype
    const matches = useMediaQuery('(min-width: 600px)');
    const router = useRouter();
    const dispatch = useAppDispatch();
  
    const [email,setEmail] = useState<any>("");
    const [contributorusername,setContributorUsername] = useState("");
    const [userTaken,setUserTaken] = useState(false);
    const [company,setCompany] = useState<any>("");
    const [password,setPassword] = useState("");
    const [isLoadingLogin, setIsLoadingLogin] = useState<Boolean>(false); // State dealing with loading spinner
    const [noResultsLogin, setNoResultsLogin] = useState<Boolean>(false); // TODO for catch errors
    const [incorrectPassword,setIncorrectPassword] = useState<Boolean>(false); // handles incorrect login
    const [subdoesnotexist,setSetSubdoesnotexist]= useState<Boolean>(false); 
    const [errorsignin,setErrorSignin] = useState<Boolean>(false);
    const [loginNotFinished,setLoginNotFinished] = useState(false);

    const checkSubscriptionEndDate = async (token:string,json:any,subscription:any) => {

    // TODO Navigate Here
    }

    const onSubmitLogin = async () => { 
        setIncorrectPassword(false) // Resets Incorrect password state
        setNoResultsLogin(false); // Resets error handling state
        setIsLoadingLogin(true); // Starts loading spinner
        setLoginNotFinished(false);
        setUserTaken(false);
        if ((email === "" && !(usertype === "contributor" && authtype === "signin") ) || password === "" || (usertype === "quotaposter" && company === "") ||(usertype === "contributor" && contributorusername === "")){
          setLoginNotFinished(true);
          setIsLoadingLogin(false);
        }
        else{
          try{
            let contriburl = "/quotabrowse"
            let quotaposterurl = "/quotaposts"
            if (usertype === "contributor"){
              const json: any = {contributor:contributorusername,email:email,password:password}
              if (authtype === "signin"){
                //console.log(json)
                const response:any = await axios.post(`http://127.0.0.1:5000/contributorsignin`, json); // Send login post request.
                const access_token = response.data.access_token
                if (access_token !== undefined){
                  setIsLoadingLogin(false)
                  dispatch(setContributorAccessToken(access_token))
                  dispatch(setReduxEmail(email))
                  dispatch(setReduxContributorUsername(contributorusername))

                  //dispatch(setReduxEmail(contributorusername))
                  //const response2:any = await axios.post(`/api/authentication`, {"contributor_access_token":access_token,"contributor_email":email});
                  //console.log(response2.data)
                  router.push(contriburl)
                }
                else{
                  setIsLoadingLogin(false)
                  setIncorrectPassword(true)
                }
              }
              else if (authtype === "signup"){
                const response:any = await axios.post(`http://127.0.0.1:5000/contributorsignup`, json); // Send login post request.
                const access_token = response.data.access_token
                if (access_token !== undefined){
                  //const response2:any = await axios.post(`/api/authentication`, {"contributor_access_token":access_token,"contributor_email":email});
                  dispatch(setContributorAccessToken(access_token));
                  dispatch(setReduxEmail(email));
                  dispatch(setReduxContributorUsername(contributorusername))
                  router.push(contriburl)
                }
                else{
                  setIsLoadingLogin(false);
                  setUserTaken(true);
                }
                
              }
            }
            else if (usertype === "quotaposter"){
              const json: any = {email:email.toLowerCase(),password:password,company:company}

              if (authtype === "signin"){
                const response:any = await axios.post(`http://localhost:5000/quotapostersignin`, json); // Send login post request.
                const access_token = response.data.access_token
        
                if (access_token !== undefined){
                  // Redux store hree
                  setIsLoadingLogin(false)
                  //const result = await CookieCreate("access_token",access_token)
                  dispatch(setQuotaPosterAccessToken(access_token));
                  dispatch(setReduxEmail(email));
                  dispatch(setReduxCompany(company))
                  //const response2:any = await axios.post(`/api/authentication`, {"access_token":access_token,"email":email,"company":company});
                  //console.log(response2.data)
                   
  

                  router.push(quotaposterurl)
                }
                else{
                  setIsLoadingLogin(false)
                  setIncorrectPassword(true)
                }
              }
              else if (authtype === "signup"){
                const response:any = await axios.post(`http://localhost:5000/quotapostersignup`, json); // Send login post request.
                const access_token = response.data.access_token
              
                if (access_token !== undefined){
                  // Redux store hree
                  setIsLoadingLogin(false)
                  dispatch(setQuotaPosterAccessToken(access_token));
                  dispatch(setReduxEmail(email));
                  dispatch(setReduxCompany(company))
                  //const response2:any = await axios.post(`/api/authentication`, {"access_token":access_token,"email":email,"company":company});
                  router.push(quotaposterurl)
                }
                else{
                  setIsLoadingLogin(false);
                  setUserTaken(true);
                }
              }

            }
            }
            catch(error){
              console.log(error)
              setErrorSignin(true) // Error handling
              setIsLoadingLogin(false); 
            }
        }

        
    
      };
    

    return(
      <div>
          <Head>
          <title>RevisonBank Signin</title>
          <meta
          name="description"
          content="RevisionBank signin for practice questsion, exam questions and revision cards for AS and A level students."
          />
          <meta
              name="keywords"
              content="Revision,revisionbank signin,revision bank signin,solution bank signin,revision bank,revisionbank,Revision Bank,RevisionBank,solutionbank,solution bank year 1,solution bank pure maths year 1,revision village,solution bank year 1 stats,solution bank year 2,solution bank,Solutionbank,Solution Bank,A Level revision, Practice Papers, Revision Bank, Revision Bank Scraper, Revision Bank Scraper for A Level, Revision Bank Scraper for O Level, Revision Bank Scraper for GCSE, Revision Bank Scraper for IB, Revision Bank Scraper for A Level Practice Papers, Revision Bank Scraper for O Level Practice Papers, Revision Bank Scraper for GCSE Practice Papers, Revision Bank Scraper for IB Practice Papers, Revision Bank Scraper for A Level Revision Cards, Revision Bank Scraper for O Level Revision Cards, Revision Bank Scraper for GCSE Revision Cards, Revision Bank Scraper for IB Revision Cards, Revision Bank Scraper for A Level Revision Practice Papers, Revision Bank Scraper for O Level Revision Practice Papers, Revision Bank Scraper for GCSE Revision Practice Papers, Revision Bank Scraper for IB Revision Practice Papers, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB Revision Practice Cards, Revision Bank Scraper for A Level Revision Practice Cards, Revision Bank Scraper for O Level Revision Practice Cards, Revision Bank Scraper for GCSE Revision Practice Cards, Revision Bank Scraper for IB"
          />
          </Head>
          <Header />
          <div className={styles.loginBox}>
            <h2>{capitalize(usertype)} {capitalize(authtype)}</h2>
            <form onSubmit={() =>{onSubmitLogin()}}>
              {usertype === "quotaposter" && 
              <div className={styles.userBox}>
                <input onChange={(e:any) => {setCompany(e.target.value)}} type="text" name="" ></input>
                <label>Company</label>
              </div>}
              {usertype === "contributor" && 
              <div className={styles.userBox}>
                <input onChange={(e:any) => {setContributorUsername(e.target.value)}} type="text" name="" ></input>
                <label>Username</label>
              </div>}
              {!(usertype === "contributor" && authtype === "signin") && 
              <div className={styles.userBox}>
                <input onChange={(e:any) => {setEmail(e.target.value)}} type="text" name="" ></input>
                <label>Email</label>
              </div>
              }
              <div className={styles.userBox}>
                <input value={password} type="password" name="" onChange={(e:any) => {setPassword(e.target.value)}} ></input>
                <label>Password</label>
              </div>
              <a style={{cursor:"pointer"}} onClick={()=> {onSubmitLogin()}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Submit
              </a>
              
              
            </form>
            {authtype === "signin" ?
            <a style={{color:"#9b6e3c",cursor:"pointer",textDecoration:"underline"}} onClick={() => {router.push(`/auth/${usertype}/signup`)}}><p>Signup here</p></a>
            :
            <a style={{color:"#9b6e3c",cursor:"pointer",textDecoration:"underline"}} onClick={() => {router.push(`/auth/${usertype}/signin`)}}><p>Signin here</p></a>
            }
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            {loginNotFinished && <p style={{color:"white"}}>Please input all fields.</p>}
            {isLoadingLogin ? <LoadingSpinner />  : null}
          {noResultsLogin ? <p style={{color:"white"}}>No Results Found</p> : null}
          {errorsignin && <p style={{color:"white"}}>Check your network connection.</p>}
          {userTaken && <p style={{color:"white"}}>Account already exists.</p>}
          {incorrectPassword && <p style={{color:"white"}}>The username or password is incorrect.</p>}
          {subdoesnotexist && <p style={{color:"white"}}>Subscription does not exist.</p>}
            </div>

          </div>
        {/*<Policies></Policies> */}
      </div>
    )
}

/*
 */