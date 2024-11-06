import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL,REGISTER_URL,NAVIGATE_LOGIN } from '../Routes';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL+REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar');
      }

      // Redirige al login tras el registro exitoso
      navigate('/');
    } catch (error) {
      console.error('Error al registrar', error);
    }
  };
  const handleLoginRedirect = () => {
    navigate(NAVIGATE_LOGIN); // Redirige a la página de registro
  };


  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>¿Ya tienes una cuenta? <button onClick={handleLoginRedirect}>Inicia sesión</button></p>
    </div>
  );
};

export default RegisterPage;
