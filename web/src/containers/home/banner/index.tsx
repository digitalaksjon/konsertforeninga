import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { BannerWrapper, BannerInner, FeaturePosts, Title, CarouselCaptionWrapper, IllustrationWrapper } from './style';
import BackgroundSlider from 'gatsby-image-background-slider';
import Img from 'gatsby-image';
import KFLogo from '../../../images/logomedillustrasjon2.png';

type BannerProps = {};

const Banner: React.FunctionComponent<BannerProps> = () => {
  const Data = useStaticQuery(graphql`
    query {


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





  return (

    <BannerWrapper>

      <BannerInner>
        <BackgroundSlider

          query={Data}
          initDelay={2} // delay before the first transition (if left at 0, the first image will be skipped initially)
          transition={4} // transition duration between images
          duration={8} // how long an image is shown
          images={["banner-bg1.jpg", "banner-bg2.jpg", "banner-bg3.jpg", "banner-bg4.jpg", "banner-bg5.jpg", "banner-bg7.jpg"]}

        // pass down standard element props
        // specify images to include (and their order) according to `relativePath`
        //images={["dog.jpg", "cat.jpg", "giraffe.jpg", "tasmanian devil.jpg", "gabe.jpg"]} 


        >
          {/* Captions in sync with background images*/}
          <CarouselCaptionWrapper><strong>SKRAP & GUITARS </strong><br />Blow Out! 2017</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>BARRE PHILIPS SOLO</strong> <br />Blow Out! Festival 2019</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>KARIN KROG  / OLE MORTEN VÅGAN / PAAL NILSSEN LOVE </strong><br />Blow Out! Festival 2018</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>BLÅROLLINGER</strong></CarouselCaptionWrapper>

          <CarouselCaptionWrapper><strong>JOHN BUTCHER & STÅLE LIAVIK SOLBERG</strong><br />Blow Out! 2017</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>FEMME BRUTAL</strong><br /></CarouselCaptionWrapper>



        </BackgroundSlider>

        <IllustrationWrapper>
          <img src={KFLogo} alt="Konsertforeninga illustrasjon" />
        </IllustrationWrapper>

      </BannerInner>
    </BannerWrapper>
  );
};

export default Banner;
