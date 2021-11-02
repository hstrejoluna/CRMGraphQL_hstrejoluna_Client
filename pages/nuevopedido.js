import { useContext } from "react";

import PedidoContext from "../context/pedidos/PedidoContext";

import Layout from "../components/Layout";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProductos from "../components/pedidos/AsignarProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import Total from "../components/pedidos/Total";

const NuevoPedido = () => {
  // Utiliza context y extrae sus funciones y valores
  const pedidoContext = useContext(PedidoContext);
  
  const { cliente, productos, total } = pedidoContext;

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? "opacity-50 cursor-not-allowed"
      : "";
  };

  return (
    <Layout titulo="Nuevo Pedido">
      <h1 className="text-2xl text-gray-800">Crear Nuevo Pedido</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />

          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
