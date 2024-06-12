import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider} from 'react-router-dom'
import { router } from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* reactProvider es para usar el reactRouter y le decimos que archivo queremos usar */}
  </React.StrictMode>,
)
