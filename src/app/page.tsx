import { getServerAuthSession } from "~/server/auth";
import Unauthorized from "./components/errors/Unauthorized";
import { getUser } from "./controllers/userController";
import ResearcherDashboard from "./components/researchers/ResearcherDashboard";

export default async function HomePage() {
  
  const session = await getServerAuthSession();
  if(!session){
    return <Unauthorized/>
  }

  const user = await getUser(session.user.id);
  if(!user){
    return <h1>AHHH NO USER</h1>
  }

  return (
    <ResearcherDashboard user={user}/>
  )
}
