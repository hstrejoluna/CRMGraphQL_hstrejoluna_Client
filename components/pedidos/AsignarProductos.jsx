import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

import { OBTENER_PRODUCTOS } from "../../graphql/queries";

const AsignarProductos = () => {
  const [productos, setProductos] = useState([]);


  const pedidoContext = useContext(PedidoContext);
  const { agregarProducto } = pedidoContext;

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    agregarProducto(productos);
  }, [productos]);

  const seleccionarProducto = (producto) => {
    setProductos(producto);
  };

  if (loading) return "Cargando...";

  const { obtenerProductos } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Selecciona o busca los productos
      </p>
      <Select
        options={obtenerProductos}
        onChange={(opcion) => seleccionarProducto(opcion)}
        isMulti={true}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) =>
          `${opciones.nombre} - ${opciones.existencia} Disponibles`
        }
        placeholder="Busque o seleccione el Producto"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarProductos;
