import { useContext } from "react";

import PedidoContext from "../context/pedidos/PedidoContext";

import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProductos from "../components/pedidos/AsignarProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";

const NuevoPedido = () => {
  // Utiliza context y extrae sus funciones y valores
  const pedidoContext = useContext(PedidoContext);

  return (
    <Layout titulo="Nuevo Pedido">
      <h1 className="text-2xl text-gray-800">Crear Nuevo Pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido/>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
