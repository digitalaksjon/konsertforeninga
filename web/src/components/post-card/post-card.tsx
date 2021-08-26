import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Img from 'gatsby-image';
import PortableText from '../portableText'
import {
  PostCardWrapper,
  PostPreview,
  PostDetails,
  PostDate,
  PostTitle,
  Excerpt,
  PostContent,
  PostTags,
} from './post-card.style';

interface PostCardProps {
  image?: any;
  title: string;
  description?: string;
  url: string;
  series?: string;
  date?: string;
  tags?: [];
  className?: string;
  imageType?: 'fixed' | 'fluid';
  placeholderBG?: string;
}

const PostCard: React.FunctionComponent<PostCardProps> = ({
  image,
  title,
  description,
  url,
  date,
  tags,
  series,
  className,
  imageType,
  placeholderBG,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ['post_card'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  Date.prototype.getMonthName = function() {
    var monthNames = ["Jan", "Feb", "Mars", "April", "Mai", "Juni",
      "Juli", "Aug", "Sept", "Okt", "Nov", "Des"
    ];
    return monthNames[this.getMonth()];
  }
  


  const dateObject = new Date(date);
  const dateString = dateObject.getDate() + "<span>"+dateObject.getMonthName(dateObject.getMonth()) + "<br />"+dateObject.getFullYear() + "</span";

  return (
    <PostCardWrapper className={addAllClasses.join(' ')} {...props}>
      {image == null ? null : (
        <PostPreview className="post_preview">
          <Link to={"/"+url}>
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

             {date && (
            <PostDate
              dangerouslySetInnerHTML={{
                __html: dateString,
              }}
              className="post_date"
            />
          )}
          </Link>
        </PostPreview>
      )}

      <PostDetails className="post_details">


        <PostContent className="post_content">
          <PostTitle className="post_title">
            <Link to={url}>{title}</Link>
          </PostTitle>
          {description && (
            <Excerpt>
                   {description && <PortableText blocks={description[0]} />}
            </Excerpt>
          )}

        </PostContent>
      </PostDetails>
    </PostCardWrapper>
  );
};

PostCard.defaultProps = {
  imageType: 'fluid',
};

export default PostCard;
