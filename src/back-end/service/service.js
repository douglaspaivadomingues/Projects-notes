import model from '../model/model.js';

const findLog = async () => {
  try {
    const [result] = await model.findLog();
    if (!result) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Log not found' }
      }
    }
    return { status: 'SUCCESS', data: result }
   } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

const findLogById = async (id) => {
    try {
    const [result] = await model.findLogById(id);
    if (!result) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Log not found' }
      }
    }
    if (result.length < 1) {
       return { status: 'BAD_REQUEST', data: {message: 'No logs here! :('} }
    }
    return { status: 'SUCCESS', data: result }
   } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

const findUser = async () => {
  try {
    const [result] = await model.findUser();
    return { 
      status: 'SUCCESS', 
      data: result }
   } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

const findUserName = async (userName) => {
  try {
    const [result] = await model.findUserName(userName);
    if (result) {
      return { 
        status: 'SUCCESS', 
        data: result }
      }
      return { 
        status: 'NOT_FOUND', 
        data:{ message: 'User not found :(' } 
      }
   } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

const addLog = async (log) => {
  console.log(log);
  try {
    const result = await model.addLog(log);
    console.log(result);
    if (result) {
      return {
        status: 'SUCCESS',
        data: { message: 'Note add with Success! :D' }
      }
    }
  } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

const addUser = async (user) => {
  try {
    const [result] = await model.addUser(user);
    if (result) {
      return {
        status: 'SUCCESS',
        data: { message: `User ${user.userName} created` }
      }
    }
  } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

const delNote = async (noteId, id_user) => {
  try {
    const [result] = await model.delNote(noteId, id_user);
    if (result) {
      return {
        status: 'SUCCESS',
        data: { message: `Success ${noteId} deleted` }
      }
    }
  } catch (error) {
    return { 
      status: 'INTERNAL_SERVER_ERROR', 
      data: { message: 'Falha na requisição' }}
   }
}

export default {
  findLog,
  addLog,
  addUser,
  findUser,
  findUserName,
  findLogById,
  delNote
};