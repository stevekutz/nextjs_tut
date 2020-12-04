import fs from 'fs'  // A Node.js module for file-system operations
import path from 'path' // A Node.js module for navigating different OS file systems
import matter from 'gray-matter' // used to read YAML front matter
import remark from 'remark'     // parse markdown
import html from 'remark-html'  // serializes Markdown as HTML


// The path.join() method joins all given path segments together 
// using the platform-specific separator as a delimiter, then normalizes the resulting path.
//    process.cwd() gets the current working directory
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get the filenames from /posts MD files by reading dir contents synchronously, (blocks other code until done)
    const fileNames = fs.readdirSync(postsDirectory)

    // map into an array
    const allPostsData = fileNames.map(fileName => {
        // truncate .md suffix
        //const id = fileName.replace(/\.md$/, '')
        const id = fileName.substr(0, fileName.length - 3)

        // read markdown as a string
        //          reads file contents synchronously (blocks other code until done)
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // let gray-matter parse post metadata section
        const matterResult = matter(fileContents)

        // merge data with id
        return {
            id, 
            ...matterResult.data
        }
    })

    // NOW, return sorted allPostsData
    return allPostsData.sort((a,b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })

}

// this will get id values for a specific post page
//              used by getStaticPaths in [id].js
export function getAllPostIds () {
    const fileNames = fs.readdirSync(postsDirectory)


    return fileNames.map(fileName => {
        return {
            // MUST return an obj NOT a string for id
            params: {
                id: fileName.substr(0, fileName.length - 3)
            //  id: fileName.replace(/\.md$/, '')
            }
        
        }
    
    })

}

// this will get all page data that matches the id
//              used by getStaticProps in [id].js

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse post metadata section for a given id
    const matterResult = matter(fileContents)

    // the metadata is processed further 
    // Use remark to convert the parsed markdown into HTML 
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)

    // console.log("\t processedContent", processedContent)        

    // convert HTML to string
    const contentHtml = processedContent.toString()
    // console.log("\t contentHtml ", contentHtml)

    // Merge id with corresponding data
    return {
        id,
        contentHtml,
        ...matterResult.data,
    }

}