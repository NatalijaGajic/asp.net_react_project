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
        public IEnumerable<T> Data { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public int? NextPage { get; set; }
        public int? PreviousPage { get; set; }
        public int? NumberOfPages { get; set; }
        


        public PagedResponse(IEnumerable<T> data, int numberOfPages)
        {
            Data = data;
            this.NumberOfPages = numberOfPages;
        }

        public PagedResponse(IEnumerable<T> data, PaginationQuery paginationQuery, int numberOfDocuments)
        {
            this.Data = data;
            this.PageNumber = paginationQuery.PageNumber;
            this.PageSize = paginationQuery.PageSize;
            this.NextPage = paginationQuery.PageNumber + 1;
            this.PreviousPage = paginationQuery.PageNumber - 1;
            //TODO: round to bigger value
            this.NumberOfPages = numberOfDocuments / PageSize;
            if(NumberOfPages * PageSize < numberOfDocuments)
            {
                NumberOfPages++;
            }
        }
    }
}
