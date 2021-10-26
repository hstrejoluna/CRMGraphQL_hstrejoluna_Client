import { useState, useEffect } from "react";
import Select from "react-select";

import { useQuery } from "@apollo/client";

import { OBTENER_CLIENTES_USUARIO } from "../graphql/queries";

const clientes = [
  { id: 1, nombre: "Cliente 1" },
  { id: 2, nombre: "Cliente 2" },
  { id: 3, nombre: "Cliente 3" },
  { id: 4, nombre: "Cliente 4" },
];

const AsignarCliente = () => {
  const [cliente, setCliente] = useState(null);

  // Consultar la base de datos
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
    setCliente(clientes[0]);
  }, [cliente]);

  const seleccionarCliente = (clientes) => {
    setCliente(clientes);
  };

  // Resultados de la consulta
  if (loading) return null;

  const { obtenerClientesVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 bodrer-gray-800 text-gray-700 p-2 text-sm font-bold">
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
