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

    concerts : allSanityConcert(


      limit: 30
        sort: { fields: concertDateTime, order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null }}
     ) {
      totalCount
      edges {
        node {       
          id
          tags
          publishedAt
          series {
            title
          }
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
      

        {Posts.filter(
          function(date) {            
            return  new Date(date.node.concertDateTime).valueOf() > convertTZ(new Date(), "Europe/Oslo").valueOf();
          }
        ).map(({ node }: any) => {

          const title = node.title || node.slug.current;

    

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
                   
                            series={node.series[0].title}
                          />
                          </PostGrid>
           
        )
      }
      ).reverse()
}
      </PostRow>
      <SeeMore>
        <Link to="konserter/">
          <Button title="Se flere" type="submit" />
        </Link>
      </SeeMore>
    </BlogPostsWrapper>
  );
};

export default Posts;

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}