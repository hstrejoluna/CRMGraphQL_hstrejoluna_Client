import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {
  const router = useRouter();

  // query de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return null;

  // Si no hay información
  if (!data.obtenerUsuario) {
    router.push("/login");
    return null;
  }

  const { nombre, apellido } = data.obtenerUsuario;

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {nombre} {apellido}, pongase a chambiar
      </p>
      <button
        onClick={() => cerrarSesion()}
        type="button"
        className="uppercase font-bold py-2 px-5 bg-red-800 inline-block text-white rounded text-sm hover:bg-red-900"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Header;
