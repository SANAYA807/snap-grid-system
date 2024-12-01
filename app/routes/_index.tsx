import { ActionFunction, redirect, type MetaFunction } from "@remix-run/node";
import Login from "~/components/Login";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export let action: ActionFunction = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const username = formData.get('username') || '';
  const password = formData.get('password') || '';

  // Mock function to simulate authentication
  const authenticateUser = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      return 'admin'; // admin credentials
    }
    if (username === 'user' && password === 'user123') {
      return 'user'; // user credentials
    }
    return null;
  };

  const role = authenticateUser(username, password);

  if (role === 'admin') {
    return redirect('/admin'); // Redirect to the admin page
  } else if (role === 'user') {
    return redirect('/user'); // Redirect to the user page
  } else {
    return Response.json({ error: 'Invalid credentials' });
  }
};

function Index() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default Index;
