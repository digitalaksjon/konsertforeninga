import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import {
  FeaturedPostWrapper,
  PostPreview,
  PostDetails,
  PostTitle,
  PostMeta,
  PostDate,
  PostTags,
} from './feature-post.style';

interface FeaturedPostProps {
  image?: any;
  title: string;
  url: string;
  date?: string;
  tags?: [];
  className?: string;
  imageType?: 'fixed' | 'fluid';
  placeholderBG?: string;
}

const FeaturedPost: React.FunctionComponent<FeaturedPostProps> = ({
  image,
  title,
  url,
  tags,
  date,
  className,
  imageType,
  placeholderBG,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ['featured_post'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <FeaturedPostWrapper className={addAllClasses.join(' ')} {...props}>
      {image == null ? null : (
        <PostPreview className="post_preview">
          <Link to={url}>
            {imageType === 'fluid' ? (
              <Img
                fluid={image}
                alt="post preview"
                backgroundColor={placeholderBG}
              />
            ) : (
              <Img
                fixed={image}
                alt="post preview"
                backgroundColor={placeholderBG}
              />
            )}
          </Link>
          {date && (
            <PostDate
              dangerouslySetInnerHTML={{
                __html: date,
              }}
              className="post_date"
            />
          )}
        </PostPreview>
      )}

      <PostDetails>
        <PostTitle className="post_title">
          <Link to={url}>{title}</Link>
        </PostTitle>
        <PostMeta>
          {tags == null ? null : (
            <PostTags className="post_tags">
              {tags.slice(0, 2).map((tag: string, index: number) => (
                <Link
                  key={index}
                  to={`/tags/${_.kebabCase(tag)}/`}
                >{`#${tag}`}</Link>
              ))}
            </PostTags>
          )}
        </PostMeta>
      </PostDetails>
    </FeaturedPostWrapper>
  );
};

FeaturedPost.defaultProps = {
  imageType: 'fluid',
};

export default FeaturedPost;
