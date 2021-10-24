import { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { NUEVO_PRODUCTO } from "../graphql/mutations";
import { OBTENER_PRODUCTOS } from "../graphql/queries";

const NuevoProducto = () => {
  const router = useRouter();

  // Mensaje de alerta
  const [mensaje, guardarMensaje] = useState(null);

  // Mutation para crear nuevos productos
  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      // Reescribimos el cache ( el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      precio: "",
      existencia: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre del producto es obligatorio"),
      precio: Yup.number().required("El precio del producto es obligatorio"),
      existencia: Yup.number().required(
        "La existencia del producto es obligatoria"
      ),
    }),
    onSubmit: async (valores) => {
      const { nombre, precio, existencia } = valores;

      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              precio,
              existencia,
            },
          },
        });
        guardarMensaje(
          `El producto ${data.nuevoProducto.nombre} se agrego con exito`
        );
        setTimeout(() => {
          guardarMensaje(null);
          router.push("/productos");
        }, 2000);
      } catch (error) {
        guardarMensaje(error.message.replace("GraphQL error: ", ""));

        setTimeout(() => {
          guardarMensaje(null);
        }, 2000);
      }
    },
  });

  const errorNombre = formik.touched.nombre && formik.errors.nombre && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.nombre}</p>
    </div>
  );

  const errorPrecio = formik.touched.precio && formik.errors.precio && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.precio}</p>
    </div>
  );

  const errorExistencia = formik.touched.existencia &&
    formik.errors.existencia && (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
        <p className="font-bold">{formik.errors.existencia}</p>
      </div>
    );

  const mostrarMensaje = () => {
    return (
      <div className="bg-white animate-pulse py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout titulo="📤 Nuevo producto ">
      <h1 className="text-2xl text-gray-800">Nuevo producto</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nombre}
              />
              {errorNombre}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="precio producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.precio}
              />
            </div>
            {errorPrecio}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="existencia"
              >
                existencia
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="existencia producto"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.existencia}
              />
            </div>
            {errorExistencia}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
              value="Registrar producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoProducto;
