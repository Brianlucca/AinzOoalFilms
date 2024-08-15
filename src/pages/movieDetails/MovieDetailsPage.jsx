import { get, onValue, push, ref, remove } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Comments from "../../components/comments/Comments";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { database } from "../../services/firebaseConfig/FirebaseConfig";
import { Calendar, Clapperboard, Star } from "lucide-react";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRef = ref(database, `movies/${id}`);
        const snapshot = await get(movieRef);
        if (snapshot.exists()) {
          setMovie(snapshot.val());
        } else {
          toast.error("Filme não encontrado");
        }
      } catch (error) {
        toast.error("Erro ao buscar detalhes do filme");
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const commentsRef = ref(database, `movies/${id}/comments`);
    onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        setComments(Object.entries(commentsData)); 
      } else {
        setComments([]);
      }
    });
  }, [id]);

  const handleCommentSubmit = async (commentText, replyingTo) => {
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    const roleRef = ref(database, `users/${user.uid}/updateNick/${user.uid}`);
    const roleSnapshot = await get(roleRef);
    const roleData = roleSnapshot.val();

    if (!roleData || !roleData.nickname) {
      toast.warn("Por favor, crie um nickname antes de comentar.");
      navigate("/profile", { state: { from: location.pathname } });
      return;
    }

    const comment = {
      text: commentText,
      userName: roleData.nickname,
      createdAt: new Date().toISOString(),
      replyingToName: replyingTo ? (comments.find(([key]) => key === replyingTo)[1].userName) : null
    };

    try {
      await push(ref(database, `movies/${id}/comments`), comment);
      toast.success("Comentário enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar comentário");
    }
  };

  const handleDeleteComment = async (commentKey) => {
    try {
      await remove(ref(database, `movies/${id}/comments/${commentKey}`));
      toast.success("Comentário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar comentário");
    }
  };

  const handleCreateSession = () => {
    navigate(`/create-session/${id}`);
  };
  
  if (!movie) {
    return <Loading />;
  }

  return (
    <div className="bg-black min-h-screen">
      <Sidebar />
      <div className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a1a1a]/70 to-black"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-white">
          <div className="flex flex-col items-center text-center space-y-6 ">
            <h1 className="text-4xl font-bold">{movie.name}</h1>
            <p className="text-lg">{movie.description}</p>
            <p className="text-lg font-semibold flex items-center space-x-2"><Star />IMDb<span>{movie.rating}</span></p>
            <p className="text-lg font-semibold flex items-center space-x-2"><Clapperboard /><span>{movie.category}</span></p>
            <p className="text-lg font-semibold flex items-center space-x-2"><Calendar/><span>{movie.year}</span></p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
              <button className="px-4 py-2 bg-[#605f5f] text-white font-semibold rounded-md shadow-md hover:bg-red-600 mb-2 sm:mb-0">
                ❤️ Favoritos
              </button>
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 bg-[#605f5f] text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
                📺 Assistir em Grupo
              </button>
            </div>
            {movie.youtubeLink && (
              <div className="w-full md:w-3/4 lg:w-2/3 mt-8">
                <iframe
                  src={movie.youtubeLink}
                  title={`Trailer de ${movie.name}`}
                  width="100%"
                  height="415"
                  className="rounded-lg shadow-md lg:mt-5"
                  allow="fullscreen"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Comments 
        comments={comments} 
        onCommentSubmit={handleCommentSubmit}
        onDeleteComment={handleDeleteComment}
      />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MovieDetailsPage;
