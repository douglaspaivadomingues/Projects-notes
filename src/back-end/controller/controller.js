import mapStatus from './mapStatus.js';
import service from '../service/service.js';

const findLog = async (req, res) => {
  const response = await service.findLog();
  return res.status(mapStatus(response.status))
    .json(response.data);
}

const findLogById = async (req, res) => {
  const { id } = req.params;
  const response = await service.findLogById(id);
  return res.status(mapStatus(response.status))
    .json(response.data);
}

const findUser = async (req, res) => {
  const response = await service.findUser();
  return res.status(mapStatus(response.status))
    .json(response.data);
}

const findUserName = async (req, res) => {
  const { username } = req.params;
  const response = await service.findUserName(username);
  return res.status(mapStatus(response.status))
    .json(response.data);
}

const addLog = async (req, res) => {
  const log = req.body;
  const newLog = await service.addLog(log);
  return res.status(mapStatus(newLog.status))
    .json(newLog.data);
}

const addUser = async (req, res) => {
  const user = req.body;
  const newLog = await service.addUser(user);
  return res.status(mapStatus(newLog.status))
    .json(newLog.data);
}

export default {
  findLog,
  addLog,
  addUser,
  findUser,
  findUserName,
  findLogById
};
