import React, { useReducer, useEffect } from 'react';
import SearchReducer, { initialState } from './search-reducer';
import { useStaticQuery, graphql } from 'gatsby';
import { Scrollbars } from 'react-custom-scrollbars';
import { rebuildIndex } from './search-index-builder-function';
import PostList from '../../components/post-list/post-list';
import {
  SearchWrapper,
  SearchForm,
  SearchResult,
  NoResult,
} from './search.style';

function Search() {
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  const data = useStaticQuery(graphql`
    query {

      site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
        description
        keywords
        siteUrl
        author {
          name
        }
      }
  

      concerts: allSanityConcert (
        sort: { fields: [publishedAt], order: DESC }

      ) {
        totalCount
        edges {
          node {       
            id
            tags
            publishedAt
            mainImage {
              asset {
              
                  fluid(maxWidth: 62, maxHeight: 52) {
                    ...GatsbySanityImageFluid
                  }
              }
            }
            title
            _rawExcerpt
            concertDateTime
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const dataset = data.concerts.edges;

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  const searchData = (e: any) => {
    const { search } = state;
    const queryResult = search.search(e.target.value);
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: { searchQuery: e.target.value, searchResults: queryResult },
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (dataset.length !== 0) {
      let data: any = [];
      dataset.forEach(({ node }: any) => {
        let formatedData = {
          ...node,
          slug: node.slug.current,
        };
        data.push(formatedData);
      });

      dispatch({ type: 'SET_DATA', payload: data });
      const dataToSearch = rebuildIndex(data);
      if (dataToSearch) {
        dispatch({
          type: 'SET_SEARCH',
          payload: dataToSearch,
        });
      }
    }
  }, [dataset]);

  const { searchResults, searchQuery } = state;
  const queryResults = searchResults;

  Date.prototype.getMonthName = function() {
    var monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[this.getMonth()];
  }
  


  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <input
          id="Search"
          value={searchQuery}
          onChange={searchData}
          placeholder="Enter Your Search Topic"
        />
      </SearchForm>
      <SearchResult>
        {queryResults.length == 0 && searchQuery !== '' ? (
          <NoResult>No result found</NoResult>
        ) : (
          ''
        )}

        {queryResults.length !== 0 && (
          <Scrollbars
            autoHeight={true}
            autoHeightMax={505}
            className="search-scrollbar"
          >
            {queryResults.map((item: any) => {
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
                placeholderColors[
                  Math.floor(Math.random() * placeholderColors.length)
                ];

                

              const dateObject = new Date(item.concertDateTime);
              const dateString = dateObject.getDate() + ". <span>"+dateObject.getMonthName(dateObject.getMonth()) + " " + dateObject.getUTCFullYear()+"</span";

              return (
                <PostList
                  key={item.slug}
                  title={item.title}
                  url={"/"+item.slug}
                  image={
                    item.mainImage == null ? null : item.mainImage.asset.fluid
                  }
                  date={dateString}
                  tags={item.tags}
                  placeholderBG={setColor}
                />
              );
            })}
          </Scrollbars>
        )}
      </SearchResult>
    </SearchWrapper>
  );
}

export default Search;
