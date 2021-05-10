import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Button from '../../../components/button/button';
import PostCardModern from '../../../components/post-card-modern/post-card-modern';
import BlogPostsWrapper, { PostRow, PostGrid, SeeMore } from './style';


type PostsProps = {};

const Posts: React.FunctionComponent<PostsProps> = () => {
  const Data = useStaticQuery(graphql`
  
  
  query {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      siteUrl
      author {
        name
      }
    }
    
    concerts: allSanityConcert (
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
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
          concertDateTime
          slug {
            current
          }
        }
      }
    }
  }
`);

  const Posts = Data.concerts.edges;

  return (
    <BlogPostsWrapper>
        <h1>Kommende konserter</h1>
      <PostRow>
        {Posts.map(({ node }: any) => {

          const title = node.title || node.slug.current;
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
            <PostGrid key={node.slug.current}>
              <PostCardModern
                key={node.slug.current}
                title={title}
                image={node.mainImage}
                tags={node.tags}
                url={node.slug.current}
                excerpt={node._rawExcerpt}
                date={node.concertDateTime}
                placeholderBG={setColor}
              />
            </PostGrid>
          );
        })}
      </PostRow>
      <SeeMore>
        <Link to="page/1">
          <Button title="Se flere" type="submit" />
        </Link>
      </SeeMore>
    </BlogPostsWrapper>
  );
};

export default Posts;
