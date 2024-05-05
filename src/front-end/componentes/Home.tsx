import { useEffect, useState } from "react";
import axios from "axios";
import validLog from "../utills/ValidLog";
import { dataType, logsType } from "../types/types";
import x from '../../../public/png-clipart-x-mark-symbol-computer-icons-symbol-miscellaneous-angle.png';

const initialLog: logsType = {
  date: '',
  note: '',
  id_user: 0,
};

function Home() {
  const [logs, setLogs] = useState<logsType>(initialLog);
  const [notes, setNotes] = useState<logsType[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [user, setUser] = useState<dataType[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    console.log(name, value);
    setLogs((prevLog) => {
      return {
        ...prevLog,
      [name]: value,
      id_user: user[0].id,
      }
    })
  }

  async function findLogs() {
    const response = await axios.get(`http://localhost:3000/logs/${user[0].id}`);
    const {data} = response;
    setNotes(data);
    setShowLogs(true);
  }

  const deleted: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setLogs(initialLog);
  };

async function handleSubmit(e: React.ChangeEvent<HTMLButtonElement>) {
  e.preventDefault();
  const valid = validLog(logs);
  if (valid === 'SUCCESS') {
    await axios.post(`http://localhost:3000/logs/`, logs);
    const response = await axios.get(`http://localhost:3000/logs/${user[0].id}`);
    const {data} = response;
    setNotes(data);
    setShowLogs(true);
    setLogs(initialLog);
  }
  return valid;
}

async function handleDelete(noteId: number) {
  await axios.delete(`http://localhost:3000/logs/users/${user[0].id}/notes/${noteId}`);
  setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
}

  console.log(logs);
  console.log(notes);

useEffect(() => {
  async function getUser() {
    const storedUSer = localStorage.getItem('userName')
    const response = await axios.get(`http://localhost:3000/logs/username/${storedUSer}`);
    const data = response.data;
    setUser(data)
  }
  getUser()
  }, [])

  return (
    <div>
      <header className="header">
        <div className="username">
        { user.map((us) => (
          <div key={us.id}>
            { us.userName }
          </div>
        ))}
      </div>
        <nav className="nav">
          <button
            id="noteButton"
            className="buttonLogs"
            onClick={findLogs}
          >
            Notes
          </button>
          <button className="buttonLogs">Find Date</button>
          <button className="buttonLogs">Find Note</button>
        </nav>
      </header>
      <div>
        <form action="submit">
          <label htmlFor="date">
            <input
              title="date"
              type="date"
              name="date"
              id="date"
              value={logs.date}
              onChange={handleChange}
            />
          </label>
            <button
              type="submit"
              onClick={handleSubmit}
              className="saveButton"
            >
              Save
            </button>
          <button
            type="submit"
            className="deleteButton"
            onClick={ deleted } 
          >
            Delete
          </button>
          <label htmlFor="note">
            <textarea
              name="note"
              id="text"
              cols={65}
              rows={10}
              placeholder="Text your note"
              value={logs.note}
              onChange={handleChange}
              maxLength={200}
              className="textArea"
            >
            </textarea>
          </label>

        </form>
      </div>
      { showLogs && (
        notes.map((log, index) => (
          <div key={index} className="container-logs">
            <div className="date">Date:
              {' '}
              {log.date}
            </div>
            <div className="note">Note:
             {' '}
             {log.note}
             <button 
               className="deleteNoteButton"
               onClick={ () => handleDelete(log.id)}
              >
              <img src={x} alt="delete"  className="imageDelete"/>
             </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home;