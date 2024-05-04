import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataType, userType } from "../types/types";
import validations from '../utills/Utills';
import axios from "axios";
import './index.css';

const newUser: userType = {
  userName: '',
  password: '',
}

function Login() {
  const [user, setuser] = useState<userType>(newUser);
  const [error, setError] = useState<string | null>();
  const [showErro, setShowErro] = useState(false);
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setuser((prevState) => {
      return {
        ...prevState,
        [name]: value}
    })
  }

    async function handleCreate(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      try {
        const response = await axios
          .get(`http://localhost:3000/logs/username/${user.userName}`);
        const data = response.data;
        const validCreated = validations(user, data);
      
      if (validCreated === 'SUCCESS') {
        const userCreated = await axios.post("http://localhost:3000/logs/create", user)
        if (userCreated.status === 200) {
          navigate('/home') 
        }
      }
      setShowErro(true);
      setError(validCreated.data.message);
      return validCreated;
      } catch (error) {
        if (error) {
        setError('Erro ao criar o usuário'); 
        }
      }
    }

  async function handleLogin(e: React.ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/logs/username/${user.userName}`);
    if (response.data.length === 0) {
      setShowErro(true);
      setError('Invalid username or password');
    }
    if (response) {
      const data = response.data;
      data.find((dt: dataType) => {
      if (dt.userName === user.userName && dt.password === user.password) {
        localStorage.setItem('userName', dt.userName);
        navigate('/home');
      }
      setError('Invalid username or password');
      })
    }
    }catch(error) {
      if (error) {
        setShowErro(true);
        setError('Invalid username or password');
      }
    }
  }

  return (
    <div className="form">
      <form action="submit" className="formAct">
        <label htmlFor="userName">
        <input
          type="text"
          name="userName"
          placeholder="user name"
          onChange={handleChange}
          className="inputForm"
        />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            className="inputForm"
          />
        </label>
        <button
          type="submit"
          onClick={handleLogin}
          className="buttonForm"
        >
          Login
        </button>
        <button
          type="submit"
          onClick={handleCreate}
          className="buttonForm"
        >
          Create</button>
      </form>
      <div className="error">
        {showErro && (
          <div>
            { error }
          </div>
        )}
      </div>
    </div>
  )
}

export default Login;