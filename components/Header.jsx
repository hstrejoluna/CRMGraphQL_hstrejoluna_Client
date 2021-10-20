import { useQuery, gql } from "@apollo/client";

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
  // query de apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  // Proteger que no accedamos a data antes de tener resultados
  if (loading) return null;

  const { nombre, apellido } = data.obtenerUsuario;
  return (
    <div className="flex justify-between mb-6">
      <p className="mr-2">
        Hola: {nombre} {apellido}, pongase a chambiar
      </p>
      <button type="button">Cerrar Sesión</button>
    </div>
  );
};

export default Header;
