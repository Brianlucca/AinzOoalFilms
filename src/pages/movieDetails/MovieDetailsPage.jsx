import { Calendar, Clapperboard, Star, Heart, HeartOff, Popcorn, Share } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Sidebar from "../../components/sidebar/Sidebar";
import useMovieDetails from "../../hooks/useMovieDetails/useMovieDetails";
import { ToastContainer } from "react-toastify";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    movie,
    comments,
    isFavorite,
    handleCommentSubmit,
    handleDeleteComment,
    toggleFavorite,
  } = useMovieDetails(id);

  const handleCreateSession = () => {
    navigate(`/create-session/${id}`);
  };

  if (!movie) {
    return <Loading />;
  }

  const handleShare = async () => {
    const message = `Confira ${movie.name} em Br14nfilmes! Avaliação do Filme: ${movie.rating}`

    if (navigator.share) {
      try {
        await navigator.share({
          text: message,
          url: window.location.href,
        })
      } catch (error) {
        toast.error('Erro ao compartilhar o código da sessão.')
      }
    } else {
      toast.warn(
        'A funcionalidade de compartilhamento não está disponível neste navegador.',
      )
    }
  }


  return (
    <div>
      <head>
        <title>{movie.name} | Br14nfilmes</title>
        <meta name="description" content={movie.description} />
        <meta property="og:title" content={movie.name} />
        <meta property="og:description" content={movie.description} />
        <meta property="og:image" content={movie.imageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Br14nfilmes" />
        <meta property="og:image:alt" content={`Imagem de ${movie.name}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={movie.name} />
        <meta property="twitter:description" content={movie.description} />
        <meta property="twitter:image" content={movie.imageUrl} />
      </head>
      <Sidebar />
      <div className="bg-black min-h-screen">
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url(${movie.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a1a1a]/70 to-black"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-white">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-4xl font-bold">{movie.name}</h1>
              <p className="text-lg">{movie.description}</p>
              <p className="text-lg font-semibold flex items-center space-x-2">
                <Star className="hover:text-yellow-300" />
                <span>{movie.rating}</span>
              </p>
              <p className="text-lg font-semibold flex items-center space-x-2">
                <Clapperboard className="hover:text-red-300" />
                <span>{movie.category}</span>
              </p>
              <p className="text-lg font-semibold flex items-center space-x-2">
                <Calendar className="hover:text-blue-300" />
                <span>{movie.year}</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
                <button
                  onClick={toggleFavorite}
                  className={`px-4 py-2 font-semibold rounded-md shadow-md flex items-center justify-center ${
                    isFavorite
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#605f5f] hover:bg-red-600"
                  } text-white mb-2 sm:mb-0`}
                >
                  {isFavorite ? (
                    <>
                      <HeartOff className="text-white mr-2" />
                      <span>Remover Favorito</span>
                    </>
                  ) : (
                    <>
                      <Heart className="text-white mr-2" />
                      <span>Adicionar aos Favoritos</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleCreateSession}
                  className="px-4 py-2 bg-[#605f5f] text-white font-semibold rounded-md shadow-md hover:bg-blue-600 flex items-center justify-center"
                >
                  <Popcorn className="text-white mr-2" />
                  <span>Criar Sessão</span>
                </button>
                <button
                  onClick={handleShare}
                  className="px-4 py-2 mt-2 sm:mt-0 bg-[#605f5f] text-white font-semibold rounded-md shadow-md hover:bg-blue-600 flex items-center justify-center"
                >
                  <Share className="text-white mr-2" />
                  <span>Compartilhar</span>
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
    </div>
  );
};

export default MovieDetailsPage;
