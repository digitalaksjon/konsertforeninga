import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import FeaturePost from '../../../components/feature-post/feature-post';
import { BannerWrapper, BannerInner, FeaturePosts, Title, CarouselCaptionWrapper } from './style';
import BackgroundSlider from 'gatsby-image-background-slider'

type BannerProps = {};

const Banner: React.FunctionComponent<BannerProps> = () => {
  const Data = useStaticQuery(graphql`
    query {

        
      concerts: allSanityConcert (
        limit: 5
        sort: { fields: [publishedAt], order: DESC }
        filter: { tags: { eq: "featured" } } 
      ) {
        totalCount
        edges {
          node {       
            id
            tags
            publishedAt
            mainImage {
              asset {
              
                  fluid(maxWidth: 90, maxHeight: 90) {
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

      backgrounds: allFile (filter: {sourceInstanceName: {eq: "backgrounds"}}){
        nodes {
          relativePath
          childImageSharp {
            fluid (maxWidth: 4000, quality: 100){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `);

  const Posts = Data.concerts.edges;

  
  



  return (
    
    <BannerWrapper>

      <BannerInner>
      <BackgroundSlider 

        query={Data}
        initDelay={2} // delay before the first transition (if left at 0, the first image will be skipped initially)
        transition={4} // transition duration between images
        duration={8} // how long an image is shown
        // specify images to include (and their order) according to `relativePath`
        //images={["dog.jpg", "cat.jpg", "giraffe.jpg", "tasmanian devil.jpg", "gabe.jpg"]} 

           
        > 
        {/* Captions in sync with background images*/}
        <CarouselCaptionWrapper>Viviana Vega</CarouselCaptionWrapper>
        <CarouselCaptionWrapper>Blow Out!</CarouselCaptionWrapper>
        <CarouselCaptionWrapper>Blårollinger</CarouselCaptionWrapper>
        <CarouselCaptionWrapper>Femme Brutal</CarouselCaptionWrapper>
        <CarouselCaptionWrapper>Skrap & Guitars</CarouselCaptionWrapper>
        <CarouselCaptionWrapper>Ståle Liavik Solberg og John Butcher</CarouselCaptionWrapper>
        <CarouselCaptionWrapper>Blow Out Festival!</CarouselCaptionWrapper>

        </BackgroundSlider>

        <FeaturePosts>
          <Title>Utvalgte konserter</Title>
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

              Date.prototype.getMonthName = function() {
                var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
                  "Juli", "August", "September", "Oktober", "November", "Desember"
                ];
                return monthNames[this.getMonth()];
              }
            
              const dateObject = new Date(node.concertDateTime);
            
            
              var concertDate = dateObject.getDay();
              var concertMonth = dateObject.getMonthName(dateObject.getMonth());
            
            
              var newDate = concertDate + `<br><span>` + concertMonth + `</span>`

            return (
              <FeaturePost
                key={node.slug.current}
                title={title}
                image={
                  node.mainImage == null
                    ? null
                    : node.mainImage.asset.fluid
                }
                url={node.slug.current}
                date={newDate}
                tags={node.tags}
                placeholderBG={setColor}
              />
            );
          })}
        </FeaturePosts>
      </BannerInner>
    </BannerWrapper>
  );
};

export default Banner;
