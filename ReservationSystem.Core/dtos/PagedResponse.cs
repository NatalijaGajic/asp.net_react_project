using ReservationSystem.Core.contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class PagedResponse<T>
    {
        public List<T> Data { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int? NextPage { get; set; }
        public int? PreviousPage { get; set; }
        public int? NumberOfPages { get; set; }
        
        public PagedResponse(int? pageNumber, int? pageSize, int? nextPage, int? previousPage, int? numberOfPages)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.NextPage = nextPage;
            this.PreviousPage = previousPage;
            this.NumberOfPages = numberOfPages;
        }
    
        public PagedResponse(List<T> data, int numberOfDocuments)
        {
            Data = data;
            this.NumberOfPages = numberOfDocuments / PageSize;
            if (NumberOfPages * PageSize < numberOfDocuments)
            {
                NumberOfPages++;
            }
        }

        public PagedResponse(List<T> data, PaginationQuery paginationQuery, int numberOfDocuments)
        {
            this.Data = data;
            this.PageNumber = paginationQuery.PageNumber;
            this.PageSize = paginationQuery.PageSize;
            this.NextPage = paginationQuery.PageNumber + 1;
            this.PreviousPage = paginationQuery.PageNumber - 1;
            //TODO: round to bigger value, calculation wrong when there is only 1 page
            this.NumberOfPages = numberOfDocuments / PageSize;
            if(NumberOfPages * PageSize < numberOfDocuments)
            {
                NumberOfPages++;
            }
        }
    }
}
