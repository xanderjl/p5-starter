import HomePage from 'components/_pages/Home'
import type { GetStaticProps, NextPage } from 'next'
import type { HomePageTypes } from 'types/Pages'
import getSketches from 'util/getSketches'

const Home: NextPage<HomePageTypes> = ({ data }) => <HomePage data={data} />

export const getStaticProps: GetStaticProps = async () => {
  const sketches = await getSketches()

  return { props: { data: { sketches } } }
}

export default Home
