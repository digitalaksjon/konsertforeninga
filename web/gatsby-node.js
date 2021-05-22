const path = require(`path`)
const _ = require('lodash')
const { createFilePath } = require(`gatsby-source-filesystem`)



function getCurrentDate() {
  const d = new Date();
  let month = (d.getMonth() + 1).toString();
  if (month.length < 2) {
    month = `0${month}`;
  }
  let day = d.getDate().toString();
  if (day.length < 2) {
    day = `0${day}`;
  }
  return `${d.getFullYear()}-${month}-${day}`;
}



exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const concert = path.resolve(`./src/templates/concert.tsx`)
  const blogList = path.resolve(`./src/templates/blog-list.tsx`)
  
  const seriesTemplate = path.resolve(`./src/templates/series.tsx`)
  const seriesList = path.resolve(`./src/templates/series-list.tsx`)
  
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const tagTemplate = path.resolve(`./src/templates/tags.tsx`)

  return graphql(
    `
      {
      concerts: allSanityConcert(
          sort: { fields: concertDateTime, order: ASC }

          limit: 1000
        ) {
          edges {
            node {
              slug {
                current
              }
              title
              tags
            }
          }
        }

    series: allSanitySeries {
          edges {
            node {
              slug {
                current
              }
              title
              _rawDescription
            }
          }
        }

      posts: allSanityPost(
          sort: { fields: publishedAt, order: DESC }

          limit: 1000
        ) {
          edges {
            node {
              slug {
                current
              }
              title
              tags
            }
          }
        }
        
      site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
        description
        keywords
        siteUrl
        author {
          name
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.posts.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.slug.current,
        component: blogPost,
        context: {
          slug: post.node.slug.current,
          previous,
          next,
          tag: post.node.tags,
        },
      })
    })

    // Create concert pages.
    const concerts = result.data.concerts.edges

    
    concerts.forEach((post, index) => {
      const previous = index === concerts.length - 1 ? null : concerts[index + 1].node
      const next = index === 0 ? null : concerts[index - 1].node
    

        createPage({
          path: post.node.slug.current,
          component: concert,
          context: {
            slug: post.node.slug.current,
            previous,
            next,
            tag: post.node.tags,
            currentDate: getCurrentDate()
            
          },
        })
    
    

    })

    // Create series pages.
    const series = result.data.series.edges

    
    series.forEach((post, index) => {
      const previous = index === series.length - 1 ? null : series[index + 1].node
      const next = index === 0 ? null : series[index - 1].node
 

        createPage({
          path: post.node.slug.current,
          component: seriesTemplate,
          context: {
            slug: post.node.slug.current,
            previous,
            next
          },
        })
    
    

    })

    // Create concert series page
    const seriesPerPage = 20
    const numPagesSeries = Math.ceil(concerts.length / seriesPerPage)

    Array.from({ length: numPagesSeries }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/serier/` : `/serier/${i + 1}`,
        component: seriesList,
        context: {
          limit: seriesPerPage,
          skip: i * seriesPerPage,
          numPagesSeries,
          currentPage: i + 1,
        },
      })
    })

    // Create concert list pages
    const postsPerPage = 10
    const numPages = Math.ceil(concerts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/page/1` : `/page/${i + 1}`,
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, 'node.tags')) {
        tags = tags.concat(edge.node.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })

    return null
  })
}



exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  

    if (node.internal.type === `sanityConcert`) {

    const value = createFilePath({ node, getNode })
    if (typeof node.slug.current !== 'undefined') {

      createNodeField({
        node,
        name: 'slug',
        value: node.slug.current,
      })
    } else {
      const value = createFilePath({ node, getNode })
      createNodeField({
        node,
        name: 'slug',
        value,
      })
    }
  }
}

// for React-Hot-Loader: react-🔥-dom patch is not detected
exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    }
  }
}
