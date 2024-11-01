import { Heart, Home, LogOut, Menu, SquarePen, Star, TvMinimalPlay, User } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { logout } from "../../services/authService/AuthService";
import Logo from "/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`relative md:flex md:flex-col md:items-start md:fixed top-0 left-0 md:bg-[#1a1a1a] md:text-white md:h-screen md:p-4 md:shadow-md transition-all duration-300 ${
        isMobileMenuOpen ? "md:w-64" : "md:w-16"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="md:hidden flex justify-between items-center p-4 bg-[#1a1a1a] text-white">
        <span className="text-lg font-semibold">AinzOoal Films</span>
        <button onClick={handleMobileMenuToggle}>
          <Menu className="w-8 h-8" />
        </button>
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ${
          isMobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        {isMobileMenuOpen ? (
          <>
            <Link
              to="/"
              className="text-lg font-semibold hover:bg-[#333333] hover:text-white p-2 w-full text-center"
            >
              Home
            </Link>
            <Link
              to="/Join-session"
              className="text-lg font-semibold hover:bg-[#333333] hover:text-white p-2 w-full text-center"
            >
              Assistir em Grupo
            </Link>
            <Link
              to="/favorites"
              className="text-lg font-semibold hover:bg-[#333333] hover:text-white p-2 w-full text-center"
            >
              Favoritos
            </Link>
            <Link
              to={isAdmin ? "/admin" : "/recommendations"}
              className="text-lg font-semibold hover:bg-[#333333] hover:text-white p-2 w-full text-center"
            >
              {isAdmin ? "Admin" : "Recomendações"}
            </Link>
            <Link
              to="/profile"
              className="text-lg font-semibold hover:bg-[#333333] hover:text-white p-2 w-full text-center"
            >
              Usuário
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg font-semibold hover:bg-[#333333] hover:text-white p-2 w-full text-center mt-auto"
            >
              Sair
            </button>
          </>
        ) : (
          <div
            className={`fixed top-0 left-0 bg-[#1a1a1a] text-white h-screen p-4 shadow-md transition-all duration-300 ${
              isOpen ? "w-64 opacity-100" : "w-16 opacity-50"
            }`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="flex flex-col items-start transition-all duration-300">
              <div className={`flex items-center mb-6 ${isOpen ? "w-64" : "w-16"} transition-all duration-300`}>
                <img src={Logo} alt="Logo" className="w-16 h-auto -ml-3" />
                {isOpen && (
                  <span className="text-lg font-semibold ml-2">AinzOoal Films</span>
                )}
              </div>
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="flex items-center space-x-2 hover:bg-[#333333] p-2 rounded-md transition-all duration-300"
                >
                  <Home className="w-6 h-6" />
                  {isOpen && <span className="text-lg">Home</span>}
                </Link>
                <Link
                  to="/Join-session"
                  className="flex items-center space-x-2 hover:bg-[#333333] p-2 rounded-md transition-all duration-300"
                >
                  <TvMinimalPlay className="w-6 h-6" />
                  {isOpen && <span className="text-lg">Assistir em Grupo</span>}
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-2 hover:bg-[#333333] p-2 rounded-md transition-all duration-300"
                >
                  <Heart className="w-6 h-6" />
                  {isOpen && <span className="text-lg">Favoritos</span>}
                </Link>
                <Link
                  to={isAdmin ? "/admin" : "/recommendations"}
                  className="flex items-center space-x-2 hover:bg-[#333333] p-2 rounded-md transition-all duration-300"
                >
                  {isAdmin ? (
                    <>
                      <User className="w-6 h-6" />
                      {isOpen && <span className="text-lg">Admin</span>}
                    </>
                  ) : (
                    <>
                      <Star className="w-6 h-6" />
                      {isOpen && <span className="text-lg">Recomendações</span>}
                    </>
                  )}
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 hover:bg-[#333333] p-2 rounded-md transition-all duration-300"
                >
                  <SquarePen className="w-6 h-6" />
                  {isOpen && <span className="text-lg">Usuário</span>}
                </Link>
              </nav>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 mt-6 hover:bg-[#333333] p-2 rounded-md transition-all duration-300"
              >
                <LogOut className="w-6 h-6" />
                {isOpen && <span className="text-lg">Sair</span>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
