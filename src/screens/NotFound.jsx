import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

function NotFound() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 flex items-center justify-center p-6">

      {/* Tarjeta glass */}
      <div className="backdrop-blur-lg bg-white/20 rounded-3xl shadow-2xl border border-white/20 p-10 max-w-md w-full animate-fade-in">
        
        {/* Ícono animado */}
        <div className="flex justify-center mb-6">
          <FiAlertTriangle className="text-white text-7xl animate-bounce" />
        </div>

        <h1 className="text-6xl font-bold text-white text-center mb-4 drop-shadow">
          404
        </h1>

        <p className="text-white/90 text-lg text-center mb-8">
          La página que buscas no se encuentra o ha sido movida.
        </p>

        <div className="flex justify-center">
          <Link 
            to="/"
            className="bg-white/20 border border-white/40 text-white px-6 py-3 rounded-full hover:bg-white/30 shadow-lg transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;