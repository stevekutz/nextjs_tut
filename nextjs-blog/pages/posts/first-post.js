import Link from 'next/link';


export default function FirstPost() {
    return (
        <div>
            <h1> First Post Page </h1>
            <h2> 
                <Link href = "/">
                    <a> Back to Home page </a>
                </Link>            
            </h2> 
        </div>

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