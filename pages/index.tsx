import type { GetStaticProps, NextPage } from 'next'
import { Product } from '../product/types';

interface Props  {
  products: Product[];
}

const Home: NextPage = () => {
  return (
    <div>
      Home
    </div>
  )
}

export const  getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      products: []
    }
  }
}

export default Home
