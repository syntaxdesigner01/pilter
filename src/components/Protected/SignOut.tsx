'use client'
import { Button } from "../ui/button";
import { signOutWithGoogle } from "@/utils/AuthProviders/appAuthCredentials";
import { routeLinks } from "@/utils/routerLinks";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function SignOut() {
const [loading,setLoading] = useState<boolean>(false)
      
  const router = useRouter();

  const handleLogOut = async () => {

    setLoading(true)
    try {
      await signOutWithGoogle();
      console.log('user logged out');

      router.push(routeLinks.home);
      
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
  };

  return (
    <Button
      disabled={loading}
      loading={loading}
      variant={"outline"}
      bg={"blackAlpha.300"}
      px={4}
      onClick={handleLogOut}
    >
      {loading ? "Loging out user" : "   Log out"}
    </Button>
  );
}
