//? Este archivo es para definir nuestras rutas
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products';
import NewProduct, { action as NewProductAction } from './views/NewProduct';
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, // es para decir que se muestre cuando naveguemos a la pagina principal
                element: <Products />, // es lo que se va a inyectar en el Outlet del Layout
                loader: productsLoader, // un loader es una funcion que carga datos antes de que se renderice un componente, es como una peticion en un useEffect
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: NewProductAction // la funcion que se va a ejecutar cuando se envie el formulario de esta página
            },
            {
                path: 'productos/:id/editar',
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])