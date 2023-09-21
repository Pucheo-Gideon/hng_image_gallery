import React, { useEffect } from "react";
import { auth } from "@/firebase/config";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";

export default function PrivateRoute({children}){

    const router = useRouter()

   useEffect(()=> {
     const unsubscribe = onAuthStateChanged(auth, (user) =>{
        if(!user){
            router.push('/auth')
        }
    })

    return () => unsubscribe
   }, [router])


    return children
}