import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";

const NuevaCuenta = () => {

  

  // Validación del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre de usuario es Obligatorio"),
      apellido: Yup.string().required("El Apellido es obligatorio"),
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("El password no puede ir vacio")
        .min(6, "El password debe ser de al menos 6 caracteres"),
    }),
    onSubmit: (valores) => {
      console.log("guayando");
      console.log(valores);
    },
  });

  const errorNombre = formik.touched.nombre && formik.errors.nombre && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.nombre}</p>
    </div>
  );

  const errorApellido = formik.touched.apellido && formik.errors.apellido && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.apellido}</p>
    </div>
  );

  const errorEmail = formik.touched.email && formik.errors.email && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.email}</p>
    </div>
  );

  const errorPassword = formik.touched.password && formik.errors.password && (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">{formik.errors.password}</p>
    </div>
  );

  return (
    <>
      <Layout>
        <h1 className="text-center text-2xl text-white font-light">
          Crear Nueva Cuenta
        </h1>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="nombre"
                  type="nombre"
                  placeholder="Nombre Usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {errorNombre}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="apellido"
                >
                  Apellido
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="apellido"
                  type="text"
                  placeholder="Apellido Usuario"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                />
              </div>
              {errorApellido}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              {errorEmail}

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="password"
                  type="password"
                  placeholder="Password Usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              {errorPassword}

              <input
                type="submit"
                className="bg-gray-800 font-black w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 cursor-pointer"
                value="Crear Cuenta"
              />
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NuevaCuenta;
