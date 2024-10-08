import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { loginUser, loginAdmin } from "../../services/authService/AuthService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (email === adminEmail && password === adminPassword) {
        await loginAdmin();
        navigate("/admin");
      } else {
        await loginUser(email, password);
        navigate("/");
      }
    } catch (error) {
      setError("Email ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-8 bg-[#1a1a1a] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full px-4 py-2 border border-gray-700 bg-[#2d2d2d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605f5f]"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border border-gray-700 bg-[#2d2d2d] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#605f5f]"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#605f5f] text-white font-semibold rounded-lg hover:bg-[#4d4d4d] focus:outline-none focus:ring-2 focus:ring-[#605f5f]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-300">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Faça o cadatro
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
