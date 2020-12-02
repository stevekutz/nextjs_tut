import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'


export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title> First Post Title </title>            
            </Head>

            <h1> First Post Page </h1>
            <h2> 
                <Link href = "/">
                    <a> Back to Home page </a>
                </Link>            
            </h2> 
        </Layout>

    )

}


// const FirstPost = () => {
//     return (
//         <>
//             <h1> First Post Arrow function</h1>
//             <h2> 
//                 <Link href = "/">
//                     <a> Back to Home page </a>
//                 </Link>            
//             </h2>
//         </>    
//     )
// }

// export default FirstPost;