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
            </PostPreview>
          )}
        </>
      ) : (
        ''
      )}
      <PostMetaWrapper>
        <div className="metaleft">
          {series && <div className="series">SERIE<br /> <span>{series}</span></div>}
          {venue && <div className="venue">STED <br /><span>{venue}</span></div>}
        </div>
        <div className="metaright">
          {concertDateTime && <div className="time">TIDSPUNKT <br/><span dangerouslySetInnerHTML={{ __html: concertDateTime }}></span></div>}
          {price && <div className="price">PRIS<br /> <span>{price}</span></div>}
        </div>

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
