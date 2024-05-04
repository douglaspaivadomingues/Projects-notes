import { useEffect, useState } from "react";
import axios from "axios";
import validLog from "../utills/ValidLog";
import { dataType, logsType } from "../types/types";

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

  console.log(logs);

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
          <button className="buttonLogs" onClick={findLogs}>logs</button>
          <button className="buttonLogs">Add note</button>
          <button className="buttonLogs">Find log</button>
          <button className="buttonLogs">Find date</button>
          <button className="buttonLogs">Find note</button>
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
          <label htmlFor="note">
            <textarea
              name="note"
              id="text"
              cols="30"
              rows="10"
              placeholder="Text your note"
              value={logs.note}
              onChange={handleChange}
              className="textArea"
            >
            </textarea>
          </label>
          <button
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button type="submit">Delete</button>
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
             {log.note}</div>
          </div>
        ))
      )}
    </div>
  )
}

export default Home;