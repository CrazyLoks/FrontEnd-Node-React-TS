import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request } : ActionFunctionArgs) { // debe de llamarse action y siempre debemos de retornar algo o redireccionar al usuario, el form identificará la funcion automaticamente, request es lo que estamos enviando al servidor
    const data = Object.fromEntries( await request.formData() ); // es la forma de obtener los datos de un formulario con el action, regresa un objeto con los valores

    let error = '';
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if (error.length) {
        return error;
    }

    await addProduct(data); // es await porque esta funcion va y agrega un producto a la BD y si todo sale bien, continua la ejecucion
    return redirect('/'); // redirect toma una url y redirecciona al usuario a esa url
}

export default function NewProduct() {

    const error = useActionData() as string; // Esta funcion es para poder tomar lo que regrese la funcion de 'action'

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Volver a Productos
                </Link>
            </div> 

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form // es un Form que es parte de React Router
                className="mt-10"
                method="POST"
            >
            
                <ProductForm />

                <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                value="Registrar Producto"
                />
            </Form>
        </>
    )
}