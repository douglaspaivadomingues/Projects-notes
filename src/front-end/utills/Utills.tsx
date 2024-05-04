import { dataType, userType } from "../types/types";

export function validations(user: userType, data: dataType[]) {
  const userExist = data.find((dt) => dt.userName === user.userName)
    if (userExist) {
      return { 
        status: 'BAD_REQUEST',
        data: { message: 'User already exist! Go to Login ;)' }
      }
    }
  if (!user.userName) {
    return { 
      status: 'BAD_REQUEST',
      data: { message: 'Insert your Username' }
    }
  }
  if (user.userName.length < 3) {
    return { 
      status: 'BAD_REQUEST',
      data: { message: 'Username must be greater than 3' }
    }
  }
  if (user.password.length <= 5) {
    return { 
      status: 'BAD_REQUEST',
      data: { message: 'Password must be greater than 3' }
    }
  }
  return 'SUCCESS'
}

export default validations;