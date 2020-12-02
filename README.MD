##### Setup

1) 1) From target project folder, run either:

    ~~~ bash
    yarn create next-app nextjs-blog
    ~~~

    or

    ~~~ bash
    npx create-next-app nextjs-blog --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/learn-starter"


    ~~~


   - the following file setup will be  created

        <img src = "img_readme/orig_setup.png" width = "25%" >

2) Key features:

    - files that reside with the `pages` folder are automatically associated with a route based on the filename. Therefore, every page becomes a file which itself is a React Component

      - pages defined with square brackets represent dynamic routes(/pages/users/[id].js  >>  users/user/1 ,  users/user/2 , ...). Query parameters are merged into a path parameters that nextjs tries to match to a route. The `/` route is associated with `pages/index.js`

    - Within a page, `props` and `dynamic routes` can be `pre-rendered`(e.g. data fetched at build time) using `getStaticProps` & `getStaticPaths` respectively


    - `_app.js allows overrriding the `App` component which is used to initialize pages`
      - the current active page is represented by the `Component` prop and any props sent with the page. Navigating to a new page is representing by its unique `Component` prop.
      - `pageProps` are any props preloaded via a Nextjs data fetching method

        ~~~ js
        function MyApp({ Component, pageProps }) {
            return <Component {...pageProps} />
        }
        ~~~

    - `_document.js` allows appending styling functionality from a `css-in-js` styling library(e.g. Material-UI, Tailwind CSS, etc.) into the application's <html> & <body> tags. This essentially wraps the app with the styling framework to allow proper server side rendering.

    - Files located within the `/api` folder get mapped to `/api/*` and behave as API endpoints

    - Changes made to files that export only React components will quickly update the next.js development server. This means that changes will be reflected in the browser almost immediately. THis feature is called `Fast Refresh` and is enabled by default.

3) Launch the default  `Next.js` app using  either:
   
    ~~~ bash
    npm run dev
    ~~~

    ~~~ bash
    yarn dev
    ~~~

##### Adding pages and links

- use the nextjs `Link` component to do client-side navigation by wrapping `<a>` tags

1) Modify the `pages/index.js` file:

    ~~~ js
    import Link from 'next/link'; //add this

    ...
    // Learn <a href="https://nextjs.org">Next.js!</a> // change this to

    Read <Link href = "/posts/first-post"><a> this page </a></Link>   

    ~~~

   - NOTE: spaces around `Link` cause an unusual error:

    <img src = "img_readme/React-Children-only_Error.png" width = "50%"/>

  
2) Create posts/first-post.js :

    -nextjs will use `code splitting` to load only what is required for the page render
    - in production, reactjs `prefetches` pages referenced in `Link` components
   - NOTE: inclusion of pages/_app.js removes anchor tag formatting on first-post page

        <img src = "img_readme/no_pages_a_formatting.png" width = "30%"/>
    
    - If CSS is required, add using className to the `a` tag, NOT the `Link` tag
    - Use `a` tags to link to external content

    ~~~ js
    import Link from 'next/link';

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

    ~~~

##### Assets, Metadata, CSS

- nextjs serves static files from the `public` directory. The file referenced by `src="/vercel.svg"` exists within the `public` directory

- the `Head` component is part of next.js. The tab of the first-psot page will display the title given to the `Head` component.

    ~~~ js
    import Head from 'next/head'

    ...

    <div>
        <Head>
            <title> First Post Title </title>            
        </Head>

        <h1> First Post Page </h1>

    ~~~

- nextjs supports the `CSS-in-JS` library `styled-jsx` that permits scoped styling. This means that other similarly referenced components do not inherit attributes as with typical CSS rules. Instead, unique classnames are generated for each JSX element

1) Set up styling for first-post.js

   - create `components/layout.module.css`

        ~~~ js
        .container {
            max-width: 36rem;
            padding: 0 1 rem;
            margin: 3rem auto 6 rem;
            border: 1px solid deeppink;
        }
        ~~~


    - create `components/layout.js`
        ~~~ js

        import styles from './layout.module.css'

        export default function Layout({children}) {
            return <div className = {stylers.container}> {children} </div>
        }
        ~~~

    - modify pages/first-post.js

        ~~~ js
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
        ~~~

2) Global styling can be implemented by adding `_app.js` to the `pages` folder

    - create `_app.js`
    - the component name does not have to be MyApp

        ~~~ js
        import '../styles/globals.css'

        function MyApp({ Component, pageProps }) {
            return <Component {...pageProps} />
        }

        export default MyApp
        ~~~



3) Adding styled-jsx to index.js starts to cause attributes to override each other

    ~~~ jsx
        <style jsx>{`
            .footerBack {
            background-color: lightgray;
        }
    
        `}</style>
    ~~~