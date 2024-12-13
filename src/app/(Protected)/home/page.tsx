
import SignupPage from "@/app/Auth/signup/page"
import { auth } from "@/auth"
import SignOut from "@/components/Protected/SignOut"



export default async function HomePage() {
    const session = await auth()
 
    if (!session) {
        return <SignupPage/>
    }


console.log(session)


  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <section>
        <p>Welcome, {session.user?.email}</p>

        <SignOut/>
      </section>
    </div>
  );
}
