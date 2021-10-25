import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import { ACTUALIZAR_PRODUCTO } from "../../graphql/mutations";
import { OBTENER_PRODUCTO } from "../../graphql/queries";
import { OBTENER_PRODUCTOS } from "../../graphql/queries";

const EditarProducto = () => {
  // obtener el ID actual
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // Consultar para obtener el cliente

  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id,
    },
  });

  // Actualizar el producto
  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO, {
    update(cache, { data: { actualizarProducto } }) {
      // Obtener el objeto de cache que deseamos actualizar
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });

      // Reescribimos el cache ( el cache nunca se debe modificar)
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [...obtenerProductos, actualizarProducto],
        },
      });
    },
  });

  // Schema de validacion
  const schemaValidacion = Yup.object({
    nombre: Yup.string().required("El nombre del cliente es obligatorio"),
    precio: Yup.number().required("El precio del producto es obligatorio"),
    existencia: Yup.number().required(
      "La existencia del producto es obligatoria"
    ),
  });

  if (loading) return "Cargando...";

  const { obtenerProducto } = data;

  // Modifica el producto en la BD
  const actualizarInfoProducto = async (valores) => {
    const { nombre, precio, existencia } = valores;

    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            precio,
            existencia,
          },
        },
      });

      // Mostrar Alerta
      Swal.fire(
        "Actualizado",
        "El producto se actualizó correctamente",
        "success"
      );

      // Redireccionar

      router.push("/productos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout titulo={"editando " + obtenerProducto.nombre}>
      <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={(valores) => {
              actualizarInfoProducto(valores);
            }}
          >
            {(props) => {
              // console.log(props);
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      placeholder="Nombre Producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.nombre}
                    />
                  </div>

                  {props.touched.nombre && props.errors.nombre ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nombre}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      type="number"
                      placeholder="Precio Producto"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.precio}
                    />
                  </div>

                  {props.touched.precio && props.errors.precio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.precio}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Cantidad en Existencia
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="existencia"
                      type="number"
                      placeholder="Cantidad en existencia"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.existencia}
                    />
                  </div>

                  {props.touched.existencia && props.errors.existencia ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.existencia}</p>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 cursor-pointer"
                    value="Editar Producto"
                  />
                </form>
              );
            }}
          </Formik>
           
        </div>
      </div>
    </Layout>
  );
};

export default EditarProducto;
