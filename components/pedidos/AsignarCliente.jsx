import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";


import PedidoContext from "../../context/pedidos/PedidoContext";

import { OBTENER_CLIENTES_USUARIO } from "../../graphql/queries";


const AsignarCliente = () => {
  const [cliente, setCliente] = useState({});

  const pedidoContext = useContext(PedidoContext);
  const { agregarCliente } = pedidoContext;

  // Consultar la base de datos
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  const seleccionarCliente = (cliente) => {
    setCliente(cliente);
  };

  // Resultados de la consulta
  if (loading) return null;

  const { obtenerClientesVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asigna un Cliente al Pedido
      </p>
      <Select
        options={obtenerClientesVendedor}
        onChange={(opcion) => seleccionarCliente(opcion)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) => opciones.nombre}
        placeholder="Busque o seleccione el cliente"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};
export default AsignarCliente;
