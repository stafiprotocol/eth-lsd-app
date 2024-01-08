import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/ETH');
  }, [router]);

  return <div></div>;
};

export default Home;
