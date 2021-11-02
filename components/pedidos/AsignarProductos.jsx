import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const AsignarProductos = () => {
  // state local del componente
  const [productos, setProductos] = useState([]);

  // Context de pedidos
  const pedidoContext = useContext(PedidoContext);
  const { agregarProducto } = pedidoContext;

  //consulta a la bd para mostrar los productos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  //console.log(data)
  //console.log(loading)
  //console.log(error)

  useEffect(() => {
    //funcion para pasar a PedidoState
    agregarProducto(productos);
  }, [productos]);

  const seleccionarProducto = (producto) => {
    setProductos(producto);
  };

  // para que el componente no cargue si no hay resultados
  if (loading) return null;

  const { obtenerProductos } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Seleccione o busque los productos
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        isMulti={true}
        onChange={(opcion) => seleccionarProducto(opcion)}
        getOptionValue={(opciones) => opciones.id}
        //getOptionLabel={ opciones => opciones.nombre}

        // muestra nombre y apellido
        getOptionLabel={(opciones) =>
          `${opciones.nombre} - ${opciones.existencia} Disponibles`
        }
        placeholder="Busque o seleccione el producto"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarProductos;
