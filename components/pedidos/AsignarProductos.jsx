import { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";

import { OBTENER_PRODUCTOS } from "../../graphql/queries";

const AsignarProductos = () => {
  const [productos, setProductos] = useState([]);

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    console.log(productos);
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
