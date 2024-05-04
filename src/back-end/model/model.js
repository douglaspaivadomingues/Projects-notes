import connection from "./connection.js";

const findLog = async () => {
  const result = await connection.execute('SELECT * FROM logs');
  return result;
}

const findUser = async () => {
  const result = await connection.execute('SELECT * FROM user');
  return result;
}

const findLogById = async (id) => {
  const result = await connection
    .execute(`SELECT * FROM logs where id_user = ? ORDER BY date ASC`, [id]);
  return result;
}

const update = async (log, id) => {
  const result = await connection
    .execute(`UPDATE logs SET date = ?, note = ?, id_user = ? WHERE id = ?`,
      [log.date, log.note, log.id_user, id]);
  return result;
}

const addLog = async (log) => {
  const newLog = await connection
    .execute(`INSERT INTO logs (date, note, id_user) VALUES (?, ?, ?)`,
      [log.date, log.note, log.id_user]);
  return newLog;
};

const addUser = async (user) => {
  const newLog = await connection
    .execute(`INSERT INTO user (userName, password) VALUES (?, ?)`,
      [user.userName, user.password]);
      console.log('voltou', newLog);
  return newLog;
};

const delLog = async (id) => {
  const result = await connection
    .execute(`DELETE FROM logs where id = ?`, [id])
  return result;
}

const findUserName = async (userName) => {
  const result = await connection
    .execute(`SELECT * FROM user where userName = ?`, [userName]);
  return result;
}

export default {
  findLog,
  findLogById,
  update,
  delLog,
  addLog,
  addUser,
  findUser,
  findUserName
};