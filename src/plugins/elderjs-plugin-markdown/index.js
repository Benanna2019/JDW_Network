// const glob = require('glob')
// const path = require('path')
// const fs = require('fs')
// const grayMatter = require('gray-matter')
// const fetch = require('node-fetch')
// const unified = require('unified')
// const vfile = require('vfile')
// const report = require('vfile-reporter')
// const remarkToc = require('remark-toc')
// const remark = require('remark')

import glob from 'glob'; 
import path from 'path'; 
import fs from 'fs'; 
import grayMatter from 'gray-matter'; 
import fetch from 'node-fetch'; 
import unified from 'unified'; 
import vfile from 'vfile'; 
import report from 'vfile-reporter'; 
import remarkToc from 'remark-toc'; 
import remark from 'remark'; 

async function parseMarkdown({ filePath, markdown }) {
    var post_vfile = vfile({ path: filePath, contents: markdown }); 
    const file = await unified().use(_preset).process(post_vfile).catch((err) => {
        console.error(report(post_vfile)); 
        throw err
    }); 
    file.extname = '.html'
    return file.toString(); 
}

const contentDirectory = path.join(process.cwd(), "content")

function getSortedPostsData() {
    //Get file names under /content
    const fileNames = fs.readdirSync(contentDirectory); 
    const allContentData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, ""); 
        
        //read markdown file as a string
        const fullPath = path.join(contentDirectory, fileName); 
        const fileContents = fs.readFileSync(fullPath, "utf-8"); 

        // Use gray-matter to parse the content metadata section
        const matterResult = matter(fileContents); 

        //Combine the data with the id
        return {
            id, 
            ...matterResult.data, 
        }
    })
    console.log(allContentData)
    return allContentData
}

function getAllContentIds() {
    const fileNames = fs.readFileSync(contentDirectory); 

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""), 
            }, 
        };
    });
}

async function getContentData(id) {
    const fullPath = path.join(contentDirectory, `${id}.md`); 
    const fileContents = fs.readFileSync(fullPath, "utf-8"); 

    // Use gray-matter to parse the content metadata section
    const matterResult = matter(fileContents); 

    // Use remark to convert markdwon into HTML string
    const processedContent = await remark().use(html).process(matterResult.content); 
    const contentHtml = processedContent.toString(); 

    // Combine the data with the id
    return {
        id, 
        contentHtml, 
        ...matterResult.data, 
    }
}

const plugin = {
    name: 'elderjs-plugin-markdown', 
    description: 'Reads and collects markdown content from specified routes. Adds all .md files as requests on allRequests', 
    init: (plugin) => {
        const { config, settings } = plugin; 

        // used to store the data in the plugin's closure so it is persisted between loads
        plugin.markdown = []; 
        plugin.requests = []; 

        if (config && Array.isArray(config.routes) && config.routes.length > 0) {
            for (const route of config.routes) {
                const markdownInRoute = path.resolve(process.cwd(), route); 
                const markdownFiles = glob.sync(`${markdownInRoute}/*.md`); 
                const segment = route.split('/').slice(-1)[0]
                for (const file of markdownFiles) {
                    const md = fs.readFileSync(file, 'utf-8')
                    const { data, content } = grayMatter(md)
                    

                    let fileSlug = file.replace('.md', '').split('/').pop(); 

                    if (fileSlug.includes(' ')) {
                        fileSlug = fileSlug.replace(/ /gim, '-')
                    }
                    const categories = data.tag || (Array.isArray(data.tag) ? data.tag : [data.tag || 'uncategorized'])

                    if (data.slug) {
                        plugin.markdown.push({
                            slug: data.slug, 
                            data: {
                                technical: segment === 'technical',
                                ...data, 
                                categories
                            }, 
                            content,
                        }); 
                        plugin.requests.push({ slug: data.slug, route: ['article']});
                    } else {
                        plugin.markdown.push({
                            slug: fileSlug, 
                            data: {
                                technical: segment === 'technical',
                                ...data, 
                                categories
                            }, 
                            content,
                        }); 
                        plugin.requests.push({ slug: fileSlug, route: 'article'})
                    }
                }
            }
        }
        return plugin; 
    }, 
    config: {}, 
    hooks: [
        {
            hook: 'bootstrap', 
            name: 'addMdFilesToDataObject',
            description: 'Add parsed .md content and data to the data object', 
            priority: 50, 
            run: async ({ data, plugin }) => {
                let articles = getSortedPostsData(); 
                articles.forEach((article) => {
                    let {
                        data, 
                        content, 
                    } = grayMatter(article); 
                    console.log("This is the data", data)
                    console.log("This is the content", content)
                const slug = data.slug || article.slug
                plugin.markdown.push({
                    slug, 
                    data: {
                        slug,
                        date: article.date, 
                        categories: article.tag_list
                    },
                    content,
                }); 
                plugin.requests.push({ slug, route: ['article']})
            })
            return {
                data: {
                    ...data,
                    markdown: plugin.markdown, 
                }, 
            };
            },
        },
        {
            hook: 'allRequests', 
            name: 'mdFilesToAllRequests', 
            description: 'Add all md files to allRequests array.', 
            priority: 50, 
            run: async ({ allRequests, plugin }) => {
                return {
                    allRequests: [...allRequests, ...plugin.requests], 
                }; 
            }, 
        }, 
        {
            hook: 'data', 
            name: 'addFrontmatterAndHtmlToDataForRequest', 
            description: 'Adds parsed frontmatter and html to the data object for the specific request.', 
            priority: 50, 
            run: async ({ request, data }) => {
                if (data.markdown) {
                    const markdown = data.markdown.find((m) => m.slug === request.slug); 
                    if (markdown) {
                        const { content, data: frontmatter } = markdown; 
                        const html = await parseMarkdown({
                            filePath: frontmatter.slug, 
                            markdown: content
                        }); 
                        return {
                            data: {
                                ...data, 
                                frontmatter, 
                                html,
                            }, 
                        };
                    }
                }
            },
        },
    ],
};
// console.log(plugin.init)
// module.exports = plugin; 
export default plugin; 