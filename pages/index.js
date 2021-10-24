import Cliente from "../components/Cliente";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

import { OBTENER_CLIENTES_USUARIO } from "../graphql/queries";


const Index = () => {
  const router = useRouter();
  // Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  

  if (loading) return "Cargando...";

  if (!data.obtenerClientesVendedor) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800">Clientes</h1>
        <Link href="/nuevocliente">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white text-sm hover:bg-gray-800 mb-3 uppercase rounded font-bold">
            Nuevo Cliente
          </a>
        </Link>
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
      </Layout>
    </div>
  );
};

export default Index;
