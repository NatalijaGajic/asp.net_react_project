import React, {useState, useEffect} from 'react'
import './PaginationStyles.css'


export default function Pagination({numOfPages}) {
    
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

    const setPage = (page) => {
        if (page === '...'){
            setCurrentPage((prev) => prev + 2 < numOfPages? prev + 2: numOfPages)
            return;
        }
        setCurrentPage(page)
    }
    return (
        <div className="pagination-container">
            <a className={currentPage === 1 && 'disabled'}
            onClick={() => setCurrentPage((prev) => prev === 1? prev: prev -1)}>Prev</a>
            {displayPages.map(page => {
                return(
                    <a className={currentPage === page && 'active'}
                    onClick={() => setPage(page)}>{page}</a>)
                })
                }
            <a className={currentPage === numOfPages && 'disabled'}
             onClick={() => setCurrentPage((prev) => prev === numOfPages? prev: prev +1)}>Next</a>  
        </div>
    )
}
