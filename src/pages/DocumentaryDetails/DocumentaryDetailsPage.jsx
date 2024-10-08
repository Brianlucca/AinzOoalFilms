import { useParams, useNavigate, useLocation } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import Footer from "../../components/footer/Footer";
import Loading from "../../components/loading/Loading";
import Sidebar from "../../components/sidebar/Sidebar";
import useDocumentaryDetails from "../../hooks/useDocumentaryDetails/useDocumentaryDetails";
import { ToastContainer } from "react-toastify";
import { Popcorn } from "lucide-react";

const DocumentaryDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    documentary,
    comments,
    isFavorite,
    handleCommentSubmit,
    handleDeleteComment,
    handleToggleFavorite,
  } = useDocumentaryDetails(id);

  const handleCreateSession = () => {
    navigate(`/create-session/${id}`);
  };

  if (!documentary) {
    return <Loading />;
  }

  return (
    <div>
      <Sidebar />
      <div className="bg-black min-h-screen">
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${documentary.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a1a1a]/70 to-black"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-white">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-4xl font-bold">{documentary.name}</h1>
              <p className="text-lg">{documentary.description}</p>
              <p className="text-lg font-semibold flex items-center space-x-2">
                <span>{documentary.rating}</span>
              </p>
              <p className="text-lg font-semibold flex items-center space-x-2">
                <span>{documentary.category}</span>
              </p>
              <p className="text-lg font-semibold flex items-center space-x-2">
                <span>{documentary.year}</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
                <button
                  onClick={handleToggleFavorite}
                  className={`px-4 py-2 font-semibold rounded-md shadow-md flex items-center justify-center ${
                    isFavorite
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#605f5f] hover:bg-red-600"
                  } text-white mb-2 sm:mb-0 flex items-center space-x-2`}
                >
                  {isFavorite ? "Remover Favorito" : "Adicionar aos Favoritos"}
                </button>
                <button
                  onClick={handleCreateSession}
                  className="px-4 py-2 bg-[#605f5f] text-white font-semibold rounded-md shadow-md hover:bg-blue-600 flex items-center justify-center"
                >
                  <Popcorn className="text-white mr-2" />
                  <span>Criar Sessão</span>
                </button>
              </div>
              {documentary.youtubeLink && (
                <div className="w-full md:w-3/4 lg:w-2/3 mt-8">
                  <iframe
                    src={documentary.youtubeLink}
                    title={`Vídeo de ${documentary.name}`}
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

export default DocumentaryDetailsPage;
