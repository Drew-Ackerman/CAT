import ResearchersTable from "../components/researchers/ResearchersTable";
import Unauthorized from "../components/errors/Unauthorized";
import { getAllUsers } from "../controllers/userController";
import { getServerAuthSession } from "~/server/auth";

/**
 * A table of all created users
 */
const ResearchersPage = async () => {
  const session = await getServerAuthSession();
  if(!session || session.user.role != "admin"){
    return <Unauthorized />
  }

  const users = await getAllUsers();
  return (
    <ResearchersTable users={users} />
  );
};

export default ResearchersPage;
