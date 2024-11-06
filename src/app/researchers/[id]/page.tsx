
import Unauthorized from "~/app/components/errors/Unauthorized";
import ResearcherDashboard from "~/app/components/researchers/ResearcherDashboard";
import { getUser } from "~/app/controllers/userController";
import { getServerAuthSession } from "~/server/auth";

export default async function ResearcherPage({params}: {params: Promise<{id: number}>}) {
  const session = await getServerAuthSession();
  if(!session){
    return <Unauthorized/>
  }

  const userId = session.user.id;
  const requestUserId = (await params).id;

  if( session.user.role != "admin" && userId != requestUserId ){
    return <Unauthorized />
  }

  const user = await getUser(requestUserId);

  if(!user){
    return <h1>HELP</h1>
  }

  return (
    <ResearcherDashboard user={user} />
  );
}
