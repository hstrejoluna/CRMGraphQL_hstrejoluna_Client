import AsignarCliente from "../components/pedidos/AsignarCliente";
import Layout from "../components/Layout";

const NuevoPedido = () => {
  return (
    <Layout titulo="Nuevo Pedido">
      <h1 className="text-2xl text-gray-800">Crear Nuevo Pedido</h1>
      <AsignarCliente />
    </Layout>
  );
};

export default NuevoPedido;
