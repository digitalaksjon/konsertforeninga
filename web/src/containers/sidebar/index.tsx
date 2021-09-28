import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import FeaturePost from '../../components/feature-post/feature-post';
import PromotionImage from '../../images/ad.jpg';

import {
  SidebarWrapper,
  SidebarWidget,
  WidgetTitle,
  InstagramWrapper,
  InstagramPhoto
} from './style';

type SidebarProps = {};

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
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


      
      ad: allFile (filter: {sourceInstanceName: {eq: "ad"}}){
        nodes {
          relativePath
          childImageSharp {
            fluid (maxWidth: 1000, quality: 90){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }


        posts: allSanityPost (
          limit: 5
          sort: { fields: [publishedAt], order: DESC }
        ) {
          totalCount
          edges {
            node {       
              id
              tags
              publishedAt
              featuredImage {
                asset {
                
                    fluid(maxWidth: 62, maxHeight: 52) {
                      ...GatsbySanityImageFluid
                    }
                }
              }
              title
              _rawExcerpt
              slug {
                current
              }
            }
          }
          group(field: tags) {
            totalCount
            fieldValue
          }
      }

    }
  `);


  const Posts = Data.posts.edges;

  return (
    <SidebarWrapper>
      <SidebarWidget>
        <div className="promoImage">
          <Img fluid={Data.ad.nodes[0].childImageSharp.fluid} alt="Bli medlem i Konsertforeninga" />

        </div>
      </SidebarWidget>

      <SidebarWidget>
        <WidgetTitle>Nytt fra foreninga</WidgetTitle>
        {Posts.map(({ node }: any) => {

          const title = node.title || node.slug.current;


    

          return (
            <FeaturePost
              key={node.slug.current}
              title={title}
              image={
                node.featuredImage == null
                  ? null
                  : node.featuredImage.asset.fluid
              }
              url={"/" + node.slug.current}
              tags={node.tags}
            />
          );
        })}
      </SidebarWidget>


    </SidebarWrapper>
  );
};

export default Sidebar;
