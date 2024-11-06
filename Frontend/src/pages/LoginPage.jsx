import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { LOGIN_URL,BASE_URL,NAVIGATE_FEED,NAVIGATE_REGISTER } from '../Routes';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para manejar errores de autenticación
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Resetea el error antes de cada intento

    try {
      const response = await fetch(BASE_URL+LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Maneja la respuesta del servidor
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el inicio de sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data._id);
      
      // Redirige al feed tras iniciar sesión
      navigate(NAVIGATE_FEED);
    } catch (error) {
      setError(error.message); // Guarda el mensaje de error para mostrarlo
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate(NAVIGATE_REGISTER); // Redirige a la página de registro
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>¿No tienes una cuenta? <button onClick={handleRegisterRedirect}>Regístrate aquí</button></p>
    </div>
  );
};

export default LoginPage;
