import React from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { OBTENER_CLIENTES_USUARIO } from "../graphql/queries";

import { ELIMINAR_CLIENTE } from "../graphql/mutations";

const Cliente = ({ obtenerClientesVendedor }) => {
  const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE);

  const confirmarEliminarCliente = (cliente) => {
    Swal.fire({
      title: "¿Deseas eliminar este cliente?",
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
          const { id, nombre, apellido } = cliente;
         
          const { data } = await eliminarCliente({
            variables: {
              id,
            },

            update(cache) {
              // Obtener una copia del objeto de cache
              const { obtenerClientesVendedor } = cache.readQuery({
                query: OBTENER_CLIENTES_USUARIO,
              });

              // Reescribir el cache
              cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: {
                  obtenerClientesVendedor: obtenerClientesVendedor.filter(
                    (clienteActual) => clienteActual.id !== id
                  ),
                },
              });
            },
          });

          Swal.fire(
            "Eliminado!",
            data.eliminarCliente.replace(
              "Cliente Eliminado",
              `${nombre} ${apellido}, ha sido removido de la lista`
            ),
            "success"
          );
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Hubo un error al eliminar el cliente",
            timer: 2000,
          });
        }
      }
    });
  };

  const router = useRouter();

  const editarCliente = (id) => {
    router.push(`/editarcliente/${id}`);
  };

  return obtenerClientesVendedor && obtenerClientesVendedor.length > 0 ? (
    <div className="overflow-x-scroll">
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white text-left">
            <th className="w-1/5 py-2 px-4">Nombre</th>
            <th className="w-1/5 py-2 px-4">Empresa</th>
            <th className="w-1/5 py-2 px-4">Email</th>
            <th className="w-1/5 py-2 px-4">Eliminar</th>
            <th className="w-1/5 py-2 px-4">Editar</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {obtenerClientesVendedor.map((cliente) => {
            return (
              <tr key={cliente.id} className=" hover:bg-gray-100">
                <td className="border px-4 py-2 ">
                  {cliente.nombre} {cliente.apellido}{" "}
                  <Link href={"tel:" + cliente.telefono}>
                    <p className="text-gray-500 hover:text-blue-500 cursor-pointer ">
                      {cliente.telefono}
                    </p>
                  </Link>
                </td>
                <td className="border px-4 py-2">{cliente.empresa}</td>
                <Link href={"mailto:" + cliente.email}>
                  <td className="border px-4 py-2 hover:text-blue-500 cursor-pointer">
                    {cliente.email}
                  </td>
                </Link>
                <td className="border px-4 py-2">
                  <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarCliente(cliente)}
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
                    onClick={() => editarCliente(cliente.id)}
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
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <>
      <h1 className="text-center text-2xl text-gray-800 font-bold">
        {" "}
        No tienes clientes
      </h1>
      <Link href="/nuevocliente">
        <a className="bg-blue-800 text-white flex justify-center py-2 px-5 mt-3 mb-3 inline-block w-full sm:w-auto text-white text-sm font-bold rounded uppercase shadow-md hover:bg-blue-900">
          Agregar nuevo cliente
        </a>
      </Link>
    </>
  );
};

export default Cliente;
