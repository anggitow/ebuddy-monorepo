import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomePage from './HomePage';

const Home = async () => {
  const token = (await cookies()).get('idToken');
  const name = (await cookies()).get('name');

  if (!token) {
    redirect('/');
  }

  return <HomePage token={token.value} name={name.value} />;
};

export default Home;
