"use client";

import { useEffect, useState } from "react";
import { CustomSession } from "../Auth/AuthWithGoogle";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
// import Image from "next/image";
import { signOutWithGoogle } from "@/utils/AuthProviders/appAuthCredentials";
import { verify_Jwt_Token } from "../../../lib/tokenGenerator";
import { JwtPayload } from "jsonwebtoken";
import { routeLinks } from "@/utils/routerLinks";

export default function LoginUser() {
  
  const [token, setToken] = useState<JwtPayload | null>(null);
  const [session, setSession] = useState<CustomSession | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const router = useRouter();

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const sessionData = await getSession();
  //     if (sessionData) {
  //       setSession(sessionData as CustomSession);
  //     }
  //     const tokenData = localStorage.getItem("token");

  //     if (tokenData) {
  //       setToken(verify_Jwt_Token(tokenData));
  //     }
  //   };
  //   fetchSession();
  // }, [router]);


  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        setSession(sessionData as CustomSession);
      }
      const tokenData = localStorage.getItem("token");

      console.log(typeof(tokenData));
      if (tokenData) {
        const verifiedToken = verify_Jwt_Token(tokenData);
        console.log("client", verifiedToken);
      }
        
      
      // if (tokenData) {
      //   const verifiedToken = verify_Jwt_Token(tokenData);
      //   if (verifiedToken) {
      //     setToken(verifiedToken);
      //   } else {
      //     console.error("Invalid token, redirecting to login...");
      //     // Handle invalid token (e.g., redirect to login)
      //     // router.push("/login"); // Adjust the path as necessary
      //   }
      // }
    };
    fetchSession();
  }, [router]);


  const handleLogOut = ()=>{
   if (session){
      signOutWithGoogle();
   }
   if(token){
     localStorage.removeItem("token");
     setToken(null);
   }
    router.push(routeLinks.signin)
  }

  return (
    <section>
      <section
        className="border-2 p-6 text-xl font-semibold flex justify-center capitalize items-center bg-pink-500 h-10 w-10 rounded-full"
        onClick={() => setShow(true)}
      >
        <span>
          {session &&
            session.user &&
            session.user.name.split("")[0].split("")[0]}
          {session &&
            session.user &&
            session.user.name.split("")[1].split("")[0]}
        </span>

        <span>{token && token.name.split("")[0]}</span>
      </section>

      {/* {session ? (
        <section>
          <Image
            src={session?.user?.image || "/default-user.png"}
            alt="user"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
            onClick={() => setShow(true)}
          />
        </section>
      ) : (
        ""
      )} */}

      {show && (
        <section
          className="text-sm flex flex-col absolute top-12 z-100 h-20 w-[vw] right-4 bg-white pt-4 px-4 gap-2 rounded-md shadow-md justify-start items-start"
          onMouseLeave={() => setShow(false)}
        >
          <span>{session?.user?.name}</span>
          <span>{token?.email}</span>
          <button onClick={() => handleLogOut()}>Logout</button>
        </section>
      )}
    </section>
  );
}
