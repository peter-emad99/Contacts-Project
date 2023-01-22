import { Await, createBrowserRouter, redirect, RouterProvider, useParams } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Contact, {
	TContact,
	loader as contactLoader,
	action as contactAction,
} from './routes/Contact';

import EditContact, { action as editAction, loader as editLoader } from './routes/EditContact';
import { deleteContact, getContact } from './contacts';
// function ContactWrapper() {
// 	const params = useParams();
// 	const [contact, setContact] = useState<TContact>();
// 	React.useEffect(() => {
// 		getContact(params.contactId).then((contact) => setContact(contact));
// 	}, [params]);
// 	return <Contact contact={contact} disabled={false} />;
// }

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		loader: rootLoader,
		action: rootAction,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						path: 'contacts/:contactId',
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: '/contacts/:contactId/edit',
						element: <EditContact />,
						loader: editLoader,
						action: editAction,
						errorElement: <div>oops there is and error</div>,
					},
					{
						path: '/contacts/:contactId/destroy',

						action: async ({ params }) => {
							await deleteContact(params.contactId);
							return redirect('/');
						},
						errorElement: <div>oops there is and error</div>,
					},
					{
						index: true,
						element: (
							<div>
								{/* <Contact
							contact={{
								first: 'your',
								last: 'name',
								favorite: true,
							}}
							disabled={true}
						/> */}
								<p id='zero-state'>
									Choose any contact from side bar to see its details
								</p>
							</div>
						),
					},
				],
			},
		],
	},
]);
export default router;
