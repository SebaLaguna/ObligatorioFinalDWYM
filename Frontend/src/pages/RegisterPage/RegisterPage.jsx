import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input"; 
import Button from "../../components/Button/Button"; 
import CustomLink from "../../components/CustomLink/CustomLink"; 
import { registerUser } from "./RegisterController"; 

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      await registerUser(username, email, password, navigate);
    } catch (error) {
      setError(error.message);
      console.error("Error al registrar", error);
    }
  };


  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Register</Button>
      </form>
      <p>
        ¿Ya tienes una cuenta?{" "}
        <CustomLink to="/" style={{ padding: "0.5rem 1rem" }}>
          Inicia sesión
        </CustomLink>
      </p>
    </div>
  );
};

export default RegisterPage;
