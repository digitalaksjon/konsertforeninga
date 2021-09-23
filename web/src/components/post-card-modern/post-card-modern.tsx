import * as React from 'react';
import { Link } from 'gatsby';
import _ from 'lodash';
import Image from "gatsby-image"
import PortableText from '../portableText'

import {
  PostCardModernWrapper,
  PostPreview,
  PostDetails,
  PostDate,
  PostTitle,
  Excerpt,
  PostTags,
} from './post-card-modern.style';

interface PostCardModernProps {
  image?: any;
  title: string;
  excerpt?: any;
  url: string;
  series?: string;
  date?: string;
  key?: string;
  tags?: [];
  className?: string;
  imageType?: 'fixed' | 'fluid';
  placeholderBG?: string;
}

const PostCardModern: React.FunctionComponent<PostCardModernProps> = ({
  image,
  title,
  excerpt,
  url,
  key,
  date,
  tags,
  series,
  className,
  imageType,
  placeholderBG,
  ...props
}) => {
  // Add all classs to an array
  const addAllClasses = ['post_card_modern'];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }



  Date.prototype.getMonthName = function () {
    var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[this.getMonth()];
  }



  const dateObject = new Date(date);

  return (
    <PostCardModernWrapper className={addAllClasses.join(' ')} {...props}>
      {image == null ? null : (
        <PostPreview className="post_preview">
          <Link to={url}>


            {image.asset
              && (
                <Image

                  fluid={image.asset.fluid}
                  alt={title}
     

                />)

            }



          </Link>
          {date && (
            <PostDate
              dangerouslySetInnerHTML={{
                __html: dateObject.getDate() + "<span>" + dateObject.getMonthName() + "</span>" ,
              }}
              className="post_date"
            />
          )}

        </PostPreview>
      )}

      <PostDetails className="post_details">

        <PostTitle className="post_title">
          <Link to={url}>{title}</Link>
        </PostTitle>

        {excerpt && <PortableText blocks={excerpt[0]} />}

      </PostDetails>
    </PostCardModernWrapper>
  );
};

PostCardModern.defaultProps = {
  imageType: 'fluid',
};

export default PostCardModern;
