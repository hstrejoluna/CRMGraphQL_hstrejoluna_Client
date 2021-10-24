import Link from "next/link";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import Router from "next/router";

import { ELIMINAR_PRODUCTO } from "../graphql/mutations";
import { OBTENER_PRODUCTOS } from "../graphql/queries";

const Producto = ({ producto }) => {
  // Mutation para eliminar producto
  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
    update(cache) {
      // Obtener una copia del objeto de cache
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      // Reescribir el cache
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter(
            (productoActual) => productoActual.id !== id
          ),
        },
      });
    },
  });
  const { nombre, precio, existencia, id } = producto;

  // Eliminar producto
  const confirmarEliminarProducto = () => {
    Swal.fire({
      title: "¿Deseas eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then(async (result) => {
      if (result.value) {
        try {
          // Eliminar por ID
          const { data } = await eliminarProducto({
            variables: {
              id,
            },
          });
          Swal.fire("Eliminado!", data.eliminarProducto, "success");
        } catch (error) {}
      }
    });
  };

  // Editar producto
  const editarProducto = () => {
    Router.push({
      pathname: "/editarproducto/[id]",
      query: { id },
    });
  };
  return (
    
    <tr className="hover:bg-gray-100">
      <td className="border px-4 py-2">{nombre}</td>
      <td className="border px-4 py-2">{existencia}</td>
      <td className="border px-4 py-2">$ {precio}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarProducto()}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
            />
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => editarProducto()}
        >
          Editar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Producto;
