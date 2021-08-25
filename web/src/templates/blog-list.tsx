import * as React from 'react';
import { graphql } from 'gatsby';
import PostCardModern from '../components/post-card-modern/post-card-modern';
import Pagination from '../components/pagination/pagination';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { BlogPostsWrapper, PostRow, PostGrid } from './templates.style';

const BlogList = (props: any) => {
  const { data } = props;
  const Posts = data.concerts.edges;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/konserter' : `/konserter/${(currentPage - 1).toString()}`;
  const nextPage = `/konserter/${(currentPage + 1).toString()}`;
  const PrevLink = !isFirst && prevPage;
  const NextLink = !isLast && nextPage;



  return (
    <Layout>
      <SEO title={`Page ${currentPage}`} />

      <BlogPostsWrapper>
        <PostRow>
          {Posts.map(({ node }: any) => {


            const postURL = "/" + node.slug.current;

            // Random Placeholder Color
            const placeholderColors = [
              '#55efc4',
              '#81ecec',
              '#74b9ff',
              '#a29bfe',
              '#ffeaa7',
              '#fab1a0',
              '#e17055',
              '#0984e3',
              '#badc58',
              '#c7ecee',
            ];
            const setColor =
              placeholderColors[
              Math.floor(Math.random() * placeholderColors.length)
              ];





            return (
              <PostGrid>
                <PostCardModern
                  key={node.slug.current}
                  title={node.title || node.slug.current}
                  image={
                    node.mainImage == null
                      ? null
                      : node.mainImage
                  }
                  url={postURL}
                  series={node.series[0].title}
                  excerpt={node._rawExcerpt || node._rawExcerpt}
                  date={node.concertDateTime}
                  tags={node.tags}
                  placeholderBG={setColor}
                />
              </PostGrid>
            );
          })}
        </PostRow>
        <Pagination
          prevLink={PrevLink}
          nextLink={NextLink}
          currentPage={`${currentPage}`}
          totalPage={`${numPages}`}
        />
      </BlogPostsWrapper>
    </Layout>
  );
};

export default BlogList;

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {


    concerts: allSanityConcert (
      limit: $limit
      skip: $skip
      sort: { fields: concertDateTime, order: DESC }
    ) {
      totalCount
      edges {
        node {       
          id
          tags
          publishedAt
          mainImage {
            asset {
            
                fluid(maxWidth: 570, maxHeight: 370) {
                  ...GatsbySanityImageFluid
                }
            }
          }
          title
          _rawExcerpt
          _rawBody
          series {
            title
          }
          concertDateTime
          slug {
            current
          }
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
`;
