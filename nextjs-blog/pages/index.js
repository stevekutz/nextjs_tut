import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p> You know, if it wasn't for the existential terror of staring into a void of space, 
        I'd say I'm feeling better today. The infection's run its course, Thanks to the blue 
        meanie back there. World governments are in pieces. The parts that are still working 
        are trying to take a census. And it looks like he did... he did exactly what he said 
        he was gonna do. Thanos wiped out fifty percent, of all living creatures </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className = {`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className = {utilStyles.headingMd}></h2>
        <ul className = {utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className = {utilStyles.listItems} key = {id}>
              {title}
              <br/>
              {id}
              <br/>
              {date}
            </li>
          ))}
        </ul>      
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

