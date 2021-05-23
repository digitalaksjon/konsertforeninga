import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PortableText from '../portableText'

type SEOProps = {
  description?: string
  lang?: string
  meta?: any
  metaImage?: any
  keywords?: any
  title: string
}

const SEO: React.FunctionComponent<SEOProps> = ({
  description,
  lang,
  meta,
  metaImage,
  keywords,
  title,
}) => {

  const detailsQuery = graphql`
    query DefaultSEOQuery {
      site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
        description
        keywords
        author {
          name
        }
      }
    }
  `;

  const { site } = useStaticQuery(detailsQuery) || {};

  const metaDescription = site.description || "";
  const pageTitle = title || "";
  const siteTitle = site.title || "";
  const siteAuthor = site.author?.name || "";



  
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={siteTitle}
      titleTemplate={`${pageTitle} | ${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: metaImage,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: siteAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
}

export default SEO
