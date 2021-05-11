import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const FeaturedPostWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  &:hover {
    .post_preview {
      > a {
        transform: scale(1.1);
      }
    }
  }
`;

export const PostPreview = styled.div`
  flex: 0 0 90px;
  flex-shrink: 0;
  margin-right: 15px;
  overflow: hidden;
  img {
    filter: grayscale(100%);
  }
  @media (max-width: 990px) {
    flex: 0 0 60px;
  }
  > a {
    display: block;
    transition: 0.15s ease-in-out;
    transform-origin: top left;
  }
`;

export const PostDetails = styled.div`
  flex-grow: 1;
`;

export const PostTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;

  line-height: 1.53;
  margin-bottom: 0;
  font-family: ${themeGet('fontFamily.0')};

  @media (max-width: 990px) {
    font-size: 16px;
  }
  @media (max-width: 575px) {
    font-size: 14px;
  }
  a {
    color: ${themeGet('colors.textColor', '#292929')};
    transition: 0.15s ease-in-out;
    &:hover {
      color: ${themeGet('primary', '#D10068')};
    }
  }
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostDate = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 55px;
  left: 55px;
  @media (max-width: 475px) {
    top: 30px;
    left: 30px;    
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  pointer-events: none;
  z-index: 1;
  background-color: rgba(209, 0, 104, 0.9);
  > span {
    font-size: 10px;
    font-weight: normal;
    line-height: 1;
    margin-top: 3px;
  }
`;

export const PostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 12px;
  @media (max-width: 990px) {
    margin-top: 10px;
  }
  @media (max-width: 575px) {
    margin-top: 8px;
  }

  a,
  span {
    display: block;
    margin-right: 30px;
    font-size: 13px;
    font-weight: 400;
    color: ${themeGet('primary', '#D10068')};
    @media (max-width: 990px) {
      font-size: 13px;
      margin-right: 25px;
    }
  }
`;
