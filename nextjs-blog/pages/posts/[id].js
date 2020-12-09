import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// postData prop passed in from getStaticProps
export default function Post({postData}) {
    
    console.log('postData ', postData)    


    return (
        <Layout>
            <Head>
                <title>postData.title</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>

        </Layout>
    )

}


// Must include getStaticPaths
export async function getStaticPaths() {
    const paths = getAllPostIds()

    console.log(">>> paths ", paths)    
    // paths  [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]


    return {
        paths, 
        fallback: false
    }

}

// Must also include getStaticProps
export async function getStaticProps({params}) {
    console.log(" >>>>>> params ", params)
    // >>>>>> params  { id: 'ssg-ssr' }
    
    const postData = await getPostData(params.id)
    console.log('getStatic ', postData)
    // getStatic  {
    // id: 'ssg-ssr',
    // title: 'When to Use Static Generation v.s. Server-side Rendering',
    // date: '2020-01-02'
    // }


    return {
        props: {
            postData
        }
    }

}