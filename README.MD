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

      - pages defined with square brackets represent dynamic routes(/pages/users/[id].js  >>  users/user/1 ,  users/user/2 , ...). Query parameters are merged into a path parameters that nextjs tries to match to a route

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

    or 

    ~~~ bash
    yarn dev
    ~~~

    