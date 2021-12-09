// Load variables from `.env` as soon as possible
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const clientConfig = require("./client-config");

const isProd = process.env.NODE_ENV === "production";


module.exports = {
  siteMetadata: {
    title: `Konsertforeninga`,
    author: `Digital Aksjon`,
    about: `Breakfast procuring no end happiness allowance assurance frank. Met simplicity nor difficulty unreserved who. Entreaties mr conviction dissimilar me
    astonished estimating cultivated.`,
    description: `Konserter i Oslo`,
    siteUrl: `https://konsertforeninga.netlify.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        minify: false, // Breaks styles if not set to false
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        // Sanity project info (required)
        ...clientConfig.sanity
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-mermaid`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },

          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `backgrounds`,
        path: `${__dirname}/content/bg`, // wherever background images are stored
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ad`,
        path: `${__dirname}/content/ad`, // wherever background images are stored
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: false
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,//`ADD YOUR TRACKING ID HERE`,
      },
    },
/*    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node._rawExcerpt,
                  date: edge.node.concertDateTime,
                  url: site.siteUrl + edge.node.slug.current,
                  guid: site.siteUrl + edge.node.slug.current,
                  custom_elements: [{ "content:encoded": edge.node._rawBody }],
                })
              })
            },
            query: `
              {
                allSanityConcert(
                  sort: { order: DESC, fields: [publishedAt] },
                ) {
                  edges {
                    node {
                      _rawExcerpt
                      _rawBody
                      slug {
                        current
                      }

                      title
                      concertDateTime
                      
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Your Site's RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/feed/",
            // optional configuration to specify external rss feed, such as feedburner
            link: "https://konsertforeninga.netlify.com/feed",
          },
        ],
      },
    },
    */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Konsertforeninga`,
        short_name: `Konsertforeninga`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-plugin-lodash`,
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: "https://konsertforeninga.us6.list-manage.com/subscribe/post?u=f6e56758bcf921e7745b845cb&id=377ebe8f70" // add your MC list endpoint here; see instructions below
      },
    },

    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: [
            'Poppins:300,400,500,600,700',
            'Fira Sans:100,300,400,500,600,700',
          ],
        },
      },
    },
  ],
};
