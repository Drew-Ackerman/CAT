import NotesTable from "../components/notes/NotesTable";
import Unauthorized from "../components/errors/Unauthorized";
import { getServerAuthSession } from "~/server/auth";
import { getAllNotes } from "../controllers/noteController";

const NotesPage = async () => {

  const session = await getServerAuthSession();
  if(!session || session.user.role != "admin"){
    return <Unauthorized/>
  }

  const notes = await getAllNotes();
  return (
    <NotesTable data={notes} />
  )
};

export default NotesPage;
