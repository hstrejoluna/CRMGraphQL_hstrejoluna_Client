import React, { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const Total = () => {

  const pedidoContext = useContext(PedidoContext);
  console.log("pedido CONTEXT ES: "+pedidoContext);
  const { total } = pedidoContext;
  console.log("total es: "+ total)

  return (
    <>
    <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid boder-2 border-gray-400">
      <h2 className="text-gray-800 text-lg">Total a pagar: </h2>
      {total} </div>
    </>
  );
};
export default Total;
