import Cliente from "../components/Cliente";
import Layout from "../components/Layout";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

import { OBTENER_CLIENTES_USUARIO } from "../graphql/queries";

const Index = () => {
  // Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  const router = useRouter();

  if (loading) {
    return (
      <Layout>
        <h1 className="text-center text-2xl text-gray-800 font-bold">
          Cargando...
        </h1>
      </Layout>
    );
  }

  if (!data.obtenerClientesVendedor) {
    router.push("/login");
    return null;
  }

  return (
    <Layout title="Clientes">
      <h1 className="text-2xl text-gray-800">Clientes</h1>
      {data &&
        data.obtenerClientesVendedor &&
        data.obtenerClientesVendedor.length > 0 && (
          <Link href="/nuevocliente">
            <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white text-sm hover:bg-gray-800 mb-3 uppercase rounded font-bold">
              Nuevo Cliente
            </a>
          </Link>
        )}

      {data &&
      data.obtenerClientesVendedor &&
      data.obtenerClientesVendedor.length === 0 ? (
        <>
          <p className="mt-5 text-center text-2xl">Aún no tienes clientes 🤔</p>
          <Link href="/nuevocliente">
            <a className="bg-green-800 flex justify-center py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-green-900">
              Nuevo Cliente
            </a>
          </Link>
        </>
      ) : (
        data.obtenerClientesVendedor && (
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white text-left">
                <th className="w-1/5 py-2 px-4">Nombre</th>
                <th className="w-1/5 py-2 px-4">Empresa</th>
                <th className="w-1/5 py-2 px-4">Email</th>
                <th className="w-1/5 py-2 px-4">Eliminar</th>
                <th className="w-1/5 py-2 px-4">Editar</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.obtenerClientesVendedor.map((cliente) => (
                <Cliente key={cliente.id} cliente={cliente} />
              ))}
            </tbody>
          </table>
        )
      )}
    </Layout>
  );
};

export default Index;
