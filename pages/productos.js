import Layout from "../components/Layout";
import Producto from "../components/Producto";
import { useQuery } from "@apollo/client";
import Link from "next/link";

import { OBTENER_PRODUCTOS } from "../graphql/queries";

const Productos = () => {
  const { loading, error, data } = useQuery(OBTENER_PRODUCTOS);
  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-bold">
          Cargando...
        </h1>
      </Layout>
    );
  }

  return (
    <Layout titulo="📦 Productos">
      <h1 className="text-2xl text-gray-800">Clientes</h1>
      {data && data.obtenerProductos && data.obtenerProductos.length > 0 && (
        <Link href="/nuevoproducto">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white text-sm hover:bg-gray-800 mb-3 uppercase rounded font-bold">
            Nuevo Producto
          </a>
        </Link>
      )}
      <h1 className="text-2xl text-gray-800">Productos</h1>
      {data && data.obtenerProductos && data.obtenerProductos.length === 0 ? (
        <>
          <p className="mt-5 text-center text-2xl">
            Aún no tienes productos 🤔
          </p>
          <Link href="/nuevoproducto">
            <a className="bg-blue-800 flex justify-center py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-blue-900 cursor-pointer">
              Nuevo Producto
            </a>
          </Link>
        </>
      ) : (
        data.obtenerProductos && (
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th className="w-1/5 py-2 px-4">Nombre</th>
                <th className="w-1/5 py-2 px-4">Existencia</th>
                <th className="w-1/5 py-2 px-4">Precio</th>
                <th className="w-1/5 py-2 px-4">Eliminar</th>
                <th className="w-1/5 py-2 px-4">Editar</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.obtenerProductos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))}
            </tbody>
          </table>
        )
      )}
    </Layout>
  );
};

export default Productos;
