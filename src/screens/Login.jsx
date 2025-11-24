import { useState } from "react";
import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// IMPORTACIÓN DE IMÁGENES DESDE ASSETS
import logo from "../assets/escudo_unsis_720.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-blue-500 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg flex w-full max-w-4xl overflow-hidden">

        {/* COLUMNA IZQUIERDA */}
        <div className="w-1/2 p-8 flex flex-col items-center">
          
          {/* LOGO */}
          <img
            src={logo}
            alt="Logo UNSIS"
            className="w-36 mb-4"
          />

          <h1 className="text-xl font-bold text-center">UNSIS</h1>
          <p className="text-center text-sm mb-6">
            Universidad de la Sierra Sur <br />
            Miahuatlán de Porfirio Díaz, Oaxaca
          </p>

          {/* USUARIO */}
          <label className="text-sm font-medium mb-1 w-full">Usuario</label>
          <div className="w-full bg-blue-100 p-3 rounded-lg flex items-center gap-2 mb-4">
            <FiUser className="text-blue-600" />
            <input
              type="text"
              className="bg-transparent w-full outline-none"
              placeholder="Ingresa tu usuario"
            />
          </div>

          {/* CONTRASEÑA */}
          <label className="text-sm font-medium mb-1 w-full">Contraseña</label>
          <div className="w-full bg-blue-100 p-3 rounded-lg flex items-center gap-2 mb-1">
            <FiLock className="text-blue-600" />
            <input
              type={showPassword ? "text" : "password"}
              className="bg-transparent w-full outline-none"
              placeholder="Ingresa tu contraseña"
            />
            {showPassword ? (
              <FiEyeOff
                className="cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEye
                className="cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <p className="text-xs self-end cursor-pointer mt-1 text-blue-600 hover:underline">
            ¿Olvidaste la contraseña?
          </p>

          <button className="bg-purple-900 text-white py-3 rounded-full w-full mt-6 hover:bg-purple-700">
            INICIAR SESIÓN
          </button>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="w-1/2 bg-blue-100 flex items-center justify-center">
          <img
            src={logo}
            alt="Imagen de login"
            className="w-72 rounded-lg shadow-md"
          />
        </div>

      </div>
    </div>
  );
}
