import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import ContactPage from './pages/Contact/View/ContactPage.tsx'
import CreateEditContactPage from './pages/Contact/CreateEdit/CreateEditContact.tsx'
import ErrorPage from './pages/Error/ErrorPage.tsx'
import { Provider } from './store/Provider.tsx'

const router = createBrowserRouter([
	{
		path: '/my-contacts',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'contatos/:contactId',
				element: <ContactPage />,
			},
			{
				path: 'contatos/novo',
				element: <CreateEditContactPage />
			},
			{
				path: 'contatos/:contactId/editar',
				element: <CreateEditContactPage />
			}
		]
	},
])

const Main = () => (
	<React.StrictMode>
		<Provider>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
if (process.env.NODE_ENV === 'test') {
	ReactDOM.createRoot(document.createElement('div')).render(<Main />)
} else {
	ReactDOM.createRoot(document.getElementById('root')!).render(<Main />)
}


export default Main
