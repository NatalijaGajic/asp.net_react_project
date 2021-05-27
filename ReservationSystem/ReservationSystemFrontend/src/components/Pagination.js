import React, {useState, useEffect} from 'react'
import './PaginationStyles.css'
import {getGamesForPageQuery} from '../api/index'

export default function Pagination(props) {
    const {numOfPages, setPage, currentPage, setCurrentPage, changeNumberOfPages, setChangeNumberOfPages} = props;
    const [pages, setPages] = useState( Array.from({length: numOfPages}, (_, i) => i + 1));
    const [displayPages, setDisplayPages] = useState(pages);
    
    useEffect(() => {
        //TODO: after useEffect in HomePage before setting numberOfPages this method is called
        //while loading component, so numberOfPageds has the previous value
       setPages(
        Array.from({length: numOfPages}, (_, i) => i + 1)
       )
       if(changeNumberOfPages){
            console.log('Setting page to 1');
            setCurrentPage(1);
       }
    }, [numOfPages])

    useEffect(() => {
        let array = [];
        if(currentPage + 3 <= numOfPages){
            array = [currentPage, currentPage+1, '...', numOfPages];
        } else {
            let dif = numOfPages - currentPage;
            console.log(dif);
            array = Array.from({length: dif}, (_, i) => i + 1 + currentPage);
            console.log('Array is:');
            console.log(array);
            array = [currentPage, ...array];
            console.log('Array is:')
            console.log(array);
        }
        setDisplayPages(array);
    }, [currentPage])

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
