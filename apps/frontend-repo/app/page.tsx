import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function Login() {
  const token = (await cookies()).get('idToken');

  if (token) {
    redirect('/home');
  }

  return <LoginForm />;
}
