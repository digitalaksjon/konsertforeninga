import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const BannerWrapper = styled.div`
  position: relative;
  padding: 90px 0;
  background-color: #d96233;
  z-index:1;
  background-size: cover;
  background-position: center;
  min-height: 870px;
  display: flex;
  
  align-items: center;
  justify-content: center;

  @media (max-width: 1500px) {
    min-height: 700px;
    padding: 80px 0;
  }

  @media (max-width: 990px) {
    min-height: 600px;
    padding: 60px 0;
  }

  @media (max-width: 767px) {
    min-height: 300px;
    padding: 40px 0;
  }
`;


export const IllustrationWrapper = styled.div`

    margin: 0 auto;
    opacity: 1;


    -webkit-animation: fadein 1s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 1s; /* Firefox < 16 */
        -ms-animation: fadein 1s; /* Internet Explorer */
         -o-animation: fadein 1s; /* Opera < 12.1 */
            animation: fadein 1s;


    @keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
      
    width: 70%;
    img {
      max-width: 100%;
    }

    @media (min-width: 991px) {
      width: 500px;
      img {
        max-width: 500px;
      }
  
    }
        
`;

export const BannerInner = styled.div`
  margin: 0 auto;
  width: 100%;

  @media (min-width: 991px) {
    width: 900px;
    }
        
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (max-width: 990px) {
    padding-left: 45px;
  }

  @media (max-width: 767px) {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

export const FeaturePosts = styled.div`
  width: 460px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 45px;
  @media (max-width: 990px) {
    width: 400px;
  }

  @media (max-width: 767px) {
    padding: 25px;
  }

  .featured_post {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Title = styled.div`
  color: ${themeGet('colors.textColor', '#292929')};
  font-size: 15px;
  font-weight: 500;
  font-family: ${themeGet('fontFamily.0', "'Fira Sans',sans-serif")};
  letter-spacing: 0.17em;
  position: relative;
  margin-bottom: 30px;

  &:after {
    content: '';
    width: 80px;
    height: 1px;
    background: #292929;
    display: block;
    margin-top: 8px;
  }
`;


export const CarouselCaptionWrapper = styled.div`
  color:white;
  padding: 10px;
  background-color: black;
  position:absolute;
  opacity: 0.8;
  right: 100px;
  bottom:100px;

  @media (max-width: 600px) {
    display:none;
  }
`;
