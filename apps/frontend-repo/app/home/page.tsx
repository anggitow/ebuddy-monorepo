import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import HomePage from './HomePage';

const Home = async () => {
  const token = (await cookies()).get('idToken');

  if (!token) {
    redirect('/');
  }

  return <HomePage token={token.value} />;
};

export default Home;
