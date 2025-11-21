import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-blue-200 flex items-center justify-center p-4">
      
      {/* Contenedor */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <img 
            src="/src/assets/escudo_unsis_720.png" 
            alt="UNSIS"
            className="w-40 h-auto mb-4"
          />
          <h2 className="text-blue-800 text-3xl font-bold">UNSIS</h2>
          <p className="text-gray-700 text-center text-sm">
            Universidad de la Sierra Sur <br />
            Miahuatlán de Porfirio Díaz, Oaxaca
          </p>
        </div>

        {/* Formulario */}
        <form className="flex flex-col gap-6">

          {/* Usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <div className="flex items-center bg-blue-100 rounded-xl px-3 py-2">
              <FiUser className="text-blue-800 text-xl" />
              <input
                type="text"
                className="w-full bg-transparent outline-none px-2 text-gray-800"
                placeholder="Ingrese su usuario"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="flex items-center bg-blue-100 rounded-xl px-3 py-2">
              <FiLock className="text-blue-800 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent outline-none px-2 text-gray-800"
                placeholder="Ingrese su contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-800"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <p className="text-right text-xs text-gray-600 mt-1 hover:underline cursor-pointer">
              ¿Olvidaste la contraseña?
            </p>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-full shadow"
          >
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </div>
  );
}
