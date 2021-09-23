import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { BannerWrapper, BannerInner, FeaturePosts, Title, CarouselCaptionWrapper, IllustrationWrapper } from './style';
import BackgroundSlider from 'gatsby-image-background-slider';
import Img from 'gatsby-image';
import KFLogo from '../../../images/logomedillustrasjon.png';

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


  const imageArray = ["banner-bg-14.jpg", "banner-bg-9.jpg", "banner-bg1.jpg","banner-bg3.jpg","banner-bg-13.jpg", "banner-bg2.jpg"];
  

  return (

    <BannerWrapper>

      <BannerInner>
        <BackgroundSlider

          query={Data}
          initDelay={7} // delay before the first transition (if left at 0, the first image will be skipped initially)
          transition={2} // transition duration between images
          duration={10} // how long an image is shown
          images={imageArray}

        // pass down standard element props
        // specify images to include (and their order) according to `relativePath`
        //images={["dog.jpg", "cat.jpg", "giraffe.jpg", "tasmanian devil.jpg", "gabe.jpg"]} 


        >
          {/* Captions in sync with background images*/}
          <CarouselCaptionWrapper><strong>Steinmøysa NB & Ståle Storløkken</strong><br />Blow Out Festival 2021</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>Propan</strong><br />Femme Brutal - Foto: Juliane Schütz</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>Skrap & Guitars </strong><br />Blow Out! 2017</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>Karin Krog / Ole Morten Vågan / Paal Nilssen-Love </strong><br />Blow Out Festival 2018</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>Per Oddvar Johansen / Lene Grenager / Ketil Gutvik</strong><br />Gutvik Ukentlig 2021</CarouselCaptionWrapper>
          <CarouselCaptionWrapper><strong>Barre Philips solo </strong><br />Blow Out Festival 2019</CarouselCaptionWrapper>



        </BackgroundSlider>

        <IllustrationWrapper>
          <img src={KFLogo} alt="Konsertforeninga illustrasjon" />
        </IllustrationWrapper>

      </BannerInner>
    </BannerWrapper>
  );
};

export default Banner;

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
