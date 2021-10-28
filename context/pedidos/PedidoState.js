import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import PedidoReducer from "./PedidoReducer";

import {
  SELECCIONAR_CLIENTE,
  SELECCIONAR_PRODUCTO,
  CANTIDAD_PRODUCTOS,
  ACTUALIZAR_TOTAL,
} from "../../types";

const PedidoState = ({ children }) => {
  const initialState = {
    cliente: {},
    productos: [],
    total: 0,
  };

  const [state, dispatch] = useReducer(PedidoReducer, initialState);

  /**
   * Modificar el cliente (Objeto cliente en el state)
   * @param {JSON} cliente
   */
  // Modificar el Cliente
  const agregarCliente = (cliente) => {
    dispatch({
      type: SELECCIONAR_CLIENTE,
      payload: cliente,
    });
  };

  /**
   * Modificar productos (Array productos en el state)
   * @param {Array} productosSeleccionados
   */

  // Modifica los productos
  const agregarProducto = (productosSeleccionados) => {
    let nuevoState;
    // Tomar del segundo arreglo una copia para asignarlo al primero
    if (state.productos && state.productos.length > 0) {
      if (productosSeleccionados) {
        nuevoState = productosSeleccionados.map((producto) => {
          const nuevoObjeto = state.productos.find(
            (productoState) => productoState.id === producto.id
          );
          return { ...producto, ...nuevoObjeto };
        });
      }
    } else {
      nuevoState = productosSeleccionados;
    }

    dispatch({
      type: SELECCIONAR_PRODUCTO,
      payload: nuevoState,
    });
  };
  /**
   *
   * @param {JSON} nuevoProducto
   */

  const cantidadProductos = (nuevoProducto) => {
    dispatch({
      type: CANTIDAD_PRODUCTOS,
      payload: nuevoProducto,
    });
  };

  const actualizarTotal = () => {
    dispatch({
      type: ACTUALIZAR_TOTAL,
    });
  };

  return (
    <PedidoContext.Provider
      value={{
        productos: state.productos,
        agregarCliente,
        agregarProducto,
        cantidadProductos,
        actualizarTotal,
        total: state.total,
        cliente: state.cliente,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export default PedidoState;
