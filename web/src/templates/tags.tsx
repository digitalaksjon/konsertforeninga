import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostCard from '../components/post-card/post-card';
import SEO from '../components/seo';
import { TagPostsWrapper, TagPageHeading, TagName } from './templates.style';

const Tags = ({ pageContext, data }: any) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allSanityConcert;

  return (
    <Layout>
      <SEO title={tag} description={`A collection of ${totalCount} post`} />

      <TagPostsWrapper>
        <TagPageHeading>
          <TagName>{tag}</TagName>
          {`A collection of ${totalCount} post`}
        </TagPageHeading>
        {edges.map(({ node, index }: any) => (
          <PostCard
            key={node.slug.current}
            title={node.title}
            url={node.slug.current}
            description={node._rawExcerpt || node._rawBody}
            date={node.concertDateTime}
            tags={node.tags}
          />
        ))}
      </TagPostsWrapper>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allSanityConcert(
      limit: 2000
      sort: { fields: [publishedAt], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      totalCount
      edges {
        node {
          _rawExcerpt
          slug {
            current
          }
          
          concertDateTime (formatString: "DD [<span>] MMMM [</span>]")
          title
          tags
          _rawBody
          
        }
      }
    }
  }
`;
