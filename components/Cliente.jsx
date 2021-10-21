import Link from "next/link";
const Cliente = ({ cliente }) => {
  const { nombre, apellido, empresa, email, telefono, id } = cliente;
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
    </tr>
  );
};
export default Cliente;
