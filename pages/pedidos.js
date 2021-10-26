import Layout from "../components/Layout";
import Link from "next/link";

const Pedidos = () => (
  <div>
    <Layout titulo="Pedidos">
      <h1 className="text-2xl text-gray-800">Pedidos</h1>
      <Link href="/nuevopedido">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white text-sm hover:bg-gray-800 mb-3 uppercase rounded font-bold">
          Nuevo Pedido
        </a>
      </Link>
    </Layout>
  </div>
);

export default Pedidos;
