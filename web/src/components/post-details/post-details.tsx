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
  series?: string;
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
  series,
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


  Date.prototype.getMonthName = function () {
    var monthNames = ["Jan", "Feb", "Mars", "April", "Mai", "Juni",
      "Juli", "Aug", "Sep", "Okt", "Nov", "Des"
    ];
    return monthNames[this.getMonth()];
  }

  const dateObject = new Date(date);


  var concertDate = dateObject.getDate();
  var concertMonth = dateObject.getMonthName(dateObject.getMonth());


  var newDate
  if (date != "NaN") {
    newDate = concertDate + `<br><span>` + concertMonth + `</span>`
  } else {
    newDate = date
  }

  return (
    <PostDetailsWrapper {...props} className={addClass.join(' ')}>
      {imagePosition == 'left' ? (
        <>
          {preview == null ? null : (
            <PostPreview className="post_preview">
              <Img fluid={preview} alt={title} />
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
              <Img fluid={preview} alt={title} />
              {newDate != "NaN" &&
                <PostDate> <div dangerouslySetInnerHTML={{ __html: newDate }} /></PostDate>
              }
              {series && <div className="series">SERIE: <span>{series}</span></div>}
            </PostPreview>
          )}
        </>
      ) : (
        ''
      )}
      <PostMetaWrapper>
        {venue && <div className="venue">STED: <span>{venue}</span></div>}
        {concertDateTime && <div className="time">TIDSPUNKT: <span dangerouslySetInnerHTML={
          { __html: concertDateTime }}></span></div>}

        {price && <div className="price">PRIS: <span>{price}</span></div>}
        {tickets && <div className="ticketButton"><Link to={tickets} target="_blank" rel="noopener noreferrer" >KJØP BILLETT</Link></div>}

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

      </PostDescriptionWrapper>
    </PostDetailsWrapper>
  );
};

PostDetails.defaultProps = {
  imagePosition: 'top',
};

export default PostDetails;
