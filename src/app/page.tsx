import { Metadata } from 'next';
import Home from './_home/Home';
export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is the home page',
};

export default async function page() {
  return <Home/>;
}

 