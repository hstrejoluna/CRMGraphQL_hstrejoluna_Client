import { useState, useEffect } from "react";
import Select from "react-select";

const clientes = [
  { id: 1, nombre: "Cliente 1" },
  { id: 2, nombre: "Cliente 2" },
  { id: 3, nombre: "Cliente 3" },
  { id: 4, nombre: "Cliente 4" },
];

const AsignarCliente = () => {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    setCliente(clientes[0]);
  }, [cliente]);

  const seleccionarCliente = (clientes) => {
    setCliente(clientes);
  };
  return (
    <Select
      options={clientes}
      isMulti={true}
      onChange={(opcion) => seleccionarCliente(opcion)}
      getOptionValue={(opciones) => opciones.id}
      getOptionLabel={(opciones) => opciones.nombre}
      placeholder="Busque o seleccione el cliente"
      noOptionsMessage={() => "No hay resultados"}
    />
  );
};
export default AsignarCliente;
