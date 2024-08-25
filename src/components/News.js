import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loadingGif, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(20);

        const url = `https://newsapi.org/v2/top-headlines?q=${props.topic}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

        props.setProgress(40);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(60);
        let parsedData = await data.json();
        console.log(parsedData); // Check the API response here
        props.setProgress(80);
        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults || 0);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.topic)} - NewsMonkey`
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchMoreData = async () => {
        setPage(prevPage => prevPage + 1);
        
        const url = `https://newsapi.org/v2/top-headlines?q=${props.topic}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData); // Check the API response here

        setArticles(prevArticles => prevArticles.concat(parsedData.articles || []));
        setTotalResults(parsedData.totalResults || 0);
    }

    return (
        <>
            <h1 className="text-center" style={{marginTop:'71px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.topic)} Headlines</h1>

            {loadingGif && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-3 my-3 mx-5" key={element.url}>
                                <NewsItem
                                    title={element.title || ""}
                                    description={element.description || ""}
                                    source={element.source.name}
                                    publishedAt={element.publishedAt}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
}

News.defaultProps = {
    topic: 'world',
    pageSize: 3,
    category: 'general',
}

News.propTypes = {
    topic: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News;
