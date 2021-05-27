import React, {useState, useEffect} from 'react'
import './PaginationStyles.css'
import {getGamesForPageQuery} from '../api/index'

export default function Pagination(props) {
    const {numOfPages, setGames} = props;
    const pages = Array.from({length: numOfPages}, (_, i) => i + 1)
    const [currentPage, setCurrentPage] = useState(1);
    const [displayPages, setDisplayPages] = useState(pages);
    
    useEffect(() => {
        let array = [];
        if(currentPage + 3 <= numOfPages){
            array = [currentPage, currentPage+1, '...', numOfPages];
        } else {
            let dif = numOfPages - currentPage;
            array = Array.from({length: dif}, (_, i) => i + 1 + currentPage)
            array = [currentPage, ...array];
        }
        setDisplayPages(array);
    }, [currentPage])

    const fetchGamesForNewPage = (queryParams) => {
        getGamesForPageQuery(queryParams).fetch()
        .then((response) => {
            console.log('fetchGamesForNewPage');
            console.log(response.data);
            setGames(response.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const setPage = (page) => {
        if (page === '...'){
            if(currentPage + 2 < numOfPages){
                let queryParams = {
                    PageNumber : currentPage + 2,
                    PageSize : 6
                }
                fetchGamesForNewPage(queryParams);
                setCurrentPage((prev) => prev + 2);

            }else {
                let queryParams = {
                    PageNumber : numOfPages,
                    PageSize : 6
                }
                fetchGamesForNewPage(queryParams);
                setCurrentPage(numOfPages);
            }
            return;
        }
        if(page === 'next'){
            if(currentPage < numOfPages){
                let queryParams = {
                    PageNumber : currentPage + 1,
                    PageSize : 6
                }
                fetchGamesForNewPage(queryParams);
                setCurrentPage((prev) => prev + 1);
            }
            return;
        }
        if(page === 'prev'){
            if(currentPage  > 1){
                let queryParams = {
                    PageNumber : currentPage - 1,
                    PageSize : 6
                }
                fetchGamesForNewPage(queryParams);
                setCurrentPage((prev) => prev - 1);
            }
            return;
        }
        let queryParams = {
            PageNumber : page,
            PageSize : 6
        }
        fetchGamesForNewPage(queryParams);
        setCurrentPage(page);
    }
    return (
        <div className="pagination-container">
            <a className={currentPage === 1?'disabled':undefined}
            onClick={() => setPage('prev')}>Prev</a>
            {displayPages.map(page => {
                return(
                    <a className={currentPage === page?'active':undefined} key={page}
                    onClick={() => setPage(page)}>{page}</a>)
                })
                }
            <a className={currentPage === numOfPages?'disabled':undefined}
             onClick={() => setPage('next')}>Next</a>  
        </div>
    )
}
