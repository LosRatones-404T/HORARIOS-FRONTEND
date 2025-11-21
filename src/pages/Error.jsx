import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

export default function Error() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-6">

      <FiAlertTriangle className="text-blue-700 text-7xl mb-4" />

      <h1 className="text-6xl font-bold text-blue-800 mb-4">404</h1>

      <p className="text-xl text-gray-700 mb-6 text-center">
        La página que buscas no existe o ha sido movida.
      </p>

      <Link 
        to="/" 
        className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full shadow-md transition-all"
      >
        Regresar al inicio
      </Link>
    </div>
  );
}
