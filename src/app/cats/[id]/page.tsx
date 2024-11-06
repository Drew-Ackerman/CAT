import CatDashboard from "~/app/components/cat/CatDashboard";
import Unauthorized from "~/app/components/errors/Unauthorized";
import { getCat } from "~/app/controllers/catController";
import { getServerAuthSession } from "~/server/auth";

export default async function CatPage({params}: {params: Promise<{id: number}>}) {
  const session = await getServerAuthSession();
  if(!session){
    return <Unauthorized/>
  }

  const userId = session.user.id;
  const catId = (await params).id
  const cat = await getCat(catId)
  
  if(!cat){
    return <Unauthorized />
  }

  const catsResearcherId = cat.researcherId

  // If the cat does not have a researcher, or doesnt match the usersId,
  // then only admins can look at them
  if(catsResearcherId != userId && session.user.role != "admin"){
    return <Unauthorized />
  }

  return (
    <CatDashboard cat={cat} />
  );
}
