import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import ContactPage from './pages/Contact/ContactPage.tsx'
import ErrorPage from './pages/Error/ErrorPage.tsx'
import NewContactPage from './pages/Contact/New/NewContactPage.tsx'
import { Provider } from './store/Provider.tsx'
import EditContactPage from './pages/Contact/Edit/EditContactPage.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'contatos/:contactId',
				element: <ContactPage />,
			},
			{
				path: 'contatos/novo',
				element: <NewContactPage />
			},
			{
				path: 'contatos/:contactId/editar',
				element: <EditContactPage />
			}
		]
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
)
