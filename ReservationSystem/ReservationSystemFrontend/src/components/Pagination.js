import React, {useState, useEffect} from 'react'
import './PaginationStyles.css'
import {getGamesForPageQuery} from '../api/index'

export default function Pagination(props) {
    const {numberOfPages, setPage, currentPage, setCurrentPage, changeNumberOfPages, setChangeNumberOfPages} = props;
    const [displayPages, setDisplayPages] = useState( Array.from({length: numberOfPages}, (_, i) => i + 1));
    
    useEffect(() => {
        //TODO: after useEffect in HomePage before setting numberOfPages this method is called
        //while loading component, so numberOfPageds has the previous value
        console.log('Use effect when number of pages changed');
        setDisplayPages(
        Array.from({length: numberOfPages}, (_, i) => i + 1)
       )
       if(changeNumberOfPages){
            console.log('Setting page to 1');
            setCurrentPage(1);
       }
    }, [numberOfPages])

    useEffect(() => {
        let array = [];
        if(currentPage + 3 <= numberOfPages){
            array = [currentPage, currentPage+1, '...', numberOfPages];
        } else {
            let dif = numberOfPages - currentPage;
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
            <a className={currentPage === numberOfPages?'disabled':undefined}
             onClick={() => setPage('next')}>Next</a>  
        </div>
    )
}
