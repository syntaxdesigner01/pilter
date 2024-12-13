import { auth } from "@/auth";
import HomePage from "@/app/(Protected)/home/page";
import LandingPage from "@/components/GeneralComponents/LandingPage";


export default async function SessionWrapper() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return <HomePage />;
}
