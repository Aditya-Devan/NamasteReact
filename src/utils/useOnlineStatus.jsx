import { useState , useEffect } from "react";

const useOnlineStstus=()=>{
 const [onlineStatus , setOnlineStatus]=useState(true);
 useEffect(()=>{

    window.addEventListener("offline" , ()=>{
        setOnlineStatus(false);
    });

   window.addEventListener("online",()=>{
     setOnlineStatus(true);
   })

 },[])

 return onlineStatus;

}

export default useOnlineStstus;

