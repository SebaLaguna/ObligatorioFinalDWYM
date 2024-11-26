import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button"; 
import CustomLink from "../../components/CustomLink/CustomLink";
import { loginUser } from "./LoginController";
import "../../styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password, setError, navigate);
  };

  return (
    <div className="login-page">
      <div className="form">
      <h2>Fakestagram</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
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
        <Button type="submit" className= "login-button">Login</Button>
      </form>
      <p className="message">
        ¿No tienes una cuenta?{" "}
        <CustomLink to="/register" style={{ padding: "0.5rem 1rem" }}>
          Regístrate aquí
        </CustomLink>
      </p>
      </div>
    </div>
  );
};

export default LoginPage;
