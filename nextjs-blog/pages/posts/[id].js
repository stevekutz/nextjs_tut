import Layout from '../../components/layout'
import {getAllPostIds, getPostData} from '../../lib/posts'

// postData prop passed in from getStaticProps
export default function Post({postData}) {
    
    console.log('postData ', postData)    


    return (
        <Layout>
            {postData.title}
            <br/>
            {postData.id}
            <br/>
            {postData.date}
        </Layout>
    )

}


// Must include getStatidPaths
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
    
    const postData = getPostData(params.id)
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