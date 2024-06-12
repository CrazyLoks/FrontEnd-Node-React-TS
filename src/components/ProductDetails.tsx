import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"; // useNavigate se usa igual que link, solo que este se puede ejecutar en base al resultado de una logica
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
    product: Product
}

export async function action({ params } : ActionFunctionArgs) { // params vienen de la url, del path
    if (params.id !== undefined) {
        await deleteProduct(+params.id);
        return redirect('/');
    }
    
}

export default function ProductDetails({ product } : ProductDetailsProps) {

    const fetcher = useFetcher(); // hook que es para hacer solicitudes de datos y enviar datos sin montar o navegar a una nueva pagina, actualiza ahi mismo los datos
    const navigate = useNavigate();
    const isAvailable = product.availability;

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                { formatCurrency(product.price) }
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST" > {/* Usamos fetcher.Form para poder jalar/enviar datos y que se actualice sin necesidad de una redireccion o de actualizar la página */}
                    <button // enviamos el name y el value
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? 'Disponible' : 'No Disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >Editar</button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`} // cuando se presione el botón, va a ir a esa url, va a caer en el path del router y va a usar el action que ahi le definimos
                        onSubmit={ (e) => { // onSubmit se ejecuta antes del action
                            if ( !confirm('¿Eliminar Producto?') ) { // Sale un mensaje nativo de JS preguntando si queremos eliminar el producto, si le damos en cancelar no pasa nada
                                e.preventDefault(); 
                            }
                        }}  
                    >
                        <input 
                            type="submit"
                            value='Eliminar'
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}