import * as React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import _ from 'lodash';
import PortableText from '../portableText'

import {
  PostDetailsWrapper,
  PostTitle,
  PostDate,
  PostPreview,
  PostDescriptionWrapper,
  PostDescription,
  PostTags,
  PostMetaWrapper,
  TicketButton
} from './post-details.style';

type PostDetailsProps = {
  title: string;
  date?: string;
  preview?: any;
  venue?: string;
  price?: string;
  concertDateTime?: any;
  description: any;
  tickets?: string;
  tags?: [];
  className?: string;
  imagePosition?: 'left' | 'top';
};

const PostDetails: React.FunctionComponent<PostDetailsProps> = ({
  title,
  date,
  preview,
  description,
  tickets,
  tags,
  price,
  venue,
  concertDateTime,
  className,
  imagePosition,
  ...props
}) => {
  const addClass: string[] = ['post_details'];


  if (imagePosition == 'left') {
    addClass.push('image_left');
  }

  if (className) {
    addClass.push(className);
  }

  
  Date.prototype.getMonthName = function() {
    var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[this.getMonth()];
  }

  const dateObject = new Date(date);


  var concertDate = dateObject.getDay();
  var concertMonth = dateObject.getMonthName(dateObject.getMonth());


  var newDate = concertDate + `<br><span>` + concertMonth + `</span>`
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
    placeholderColors[Math.floor(Math.random() * placeholderColors.length)];

  return (
    <PostDetailsWrapper {...props} className={addClass.join(' ')}>
      {imagePosition == 'left' ? (
        <>
          {preview == null ? null : (
            <PostPreview className="post_preview">
              <Img fluid={preview} alt={title} backgroundColor={setColor} />
            </PostPreview>
          )}
        </>
      ) : (
        ''
      )}

      {imagePosition == 'top' ? (
        <>
          <PostTitle>{title}</PostTitle>
 
        </>
      ) : (
        ''
      )}

      {imagePosition == 'top' ? (
        <>
          {preview == null ? null : (
            <PostPreview className="post_preview">
              <Img fluid={preview} alt={title} backgroundColor={setColor} />
              <PostDate> <div dangerouslySetInnerHTML={{ __html: newDate}} /></PostDate>
            </PostPreview>
          )}
        </>
      ) : (
        ''
      )}
      <PostMetaWrapper>
      
        <div className="venue">{venue}</div>
        <div className="time">Kl. {concertDateTime}</div>
        <div className="price">{price}</div>        
        <div className="ticketButton"><Link to={tickets} target="_blank" rel="noopener noreferrer" >KJØP BILLETTER</Link></div>
      </PostMetaWrapper>

      
      <PostDescriptionWrapper className="post_des_wrapper">
        {imagePosition == 'left' ? (
          <>
            <PostTitle>{title}</PostTitle>
            <PostDate>{date}</PostDate>
          </>
        ) : (
          ''
        )}
        <PostDescription>
        {description && <PortableText blocks={description} className="post_des" />}

        </PostDescription>
        {tags == null ? null : (
          <PostTags>
            {tags.map((tag, index) => (
              <Link key={index} to={`/tags/${_.kebabCase(tag)}/`}>
                {`#${tag}`}
              </Link>
            ))}
          </PostTags>
        )}
      </PostDescriptionWrapper>
    </PostDetailsWrapper>
  );
};

PostDetails.defaultProps = {
  imagePosition: 'top',
};

export default PostDetails;
