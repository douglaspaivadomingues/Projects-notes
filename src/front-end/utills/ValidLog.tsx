import { logsType } from "../types/types";

const validLog = (logs: logsType) => {
  if(!logs.id_user || !logs.date || logs.note === '') {
    return 'Invalid Data'
  }
  if(logs.note.length < 3) {
    return 'Note must be more than 3'
  }
  return 'SUCCESS'
}

export default validLog;