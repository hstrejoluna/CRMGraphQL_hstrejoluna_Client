import Link from "next/link";
import Swal from "sweetalert2";

const Cliente = ({ cliente }) => {
  const { nombre, apellido, empresa, email, telefono, id } = cliente;

  //Eliminar Cliente
  const confirmarEliminarCliente = (id) => {
    Swal.fire({
      title: "¿Deseas eliminar este cliente?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <tr className=" hover:bg-gray-100">
      <td className="border px-4 py-2 ">
        {nombre} {apellido}{" "}
        <Link href={"tel:" + telefono}>
          <p className="text-gray-500 hover:text-blue-500 cursor-pointer ">
            {telefono}
          </p>
        </Link>
      </td>
      <td className="border px-4 py-2">{empresa}</td>
      <Link href={"mailto:" + email}>
        <td className="border px-4 py-2 hover:text-blue-500 cursor-pointer">
          {email}
        </td>
      </Link>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmarEliminarCliente(id)}
        >
          Eliminar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
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
    </tr>
  );
};
export default Cliente;
