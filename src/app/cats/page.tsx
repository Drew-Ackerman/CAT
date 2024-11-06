
import CatTable from "../components/cat/CatTable";
import Unauthorized from "../components/errors/Unauthorized";
import { getServerAuthSession } from "~/server/auth";
import { getAllCats } from "../controllers/catController";
import { getAllUsers } from "../controllers/userController";

/**
 * A table of cat records. 
 */
const CatsPage = async () => {  
  const session = await getServerAuthSession();
  if(!session || session.user.role != "admin"){
    return <Unauthorized/>
  }

  const cats = await getAllCats();
  const users = await getAllUsers();

  return (
    <CatTable
      cats={cats}
      users={users}
    />
  );
};

export default CatsPage;
