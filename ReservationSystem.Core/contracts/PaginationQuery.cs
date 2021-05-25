using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.contracts
{
    public class PaginationQuery
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public int MaximumSize = 18;

        public PaginationQuery()
        {
            PageNumber = 1;
            PageSize = 6;
        }

        public PaginationQuery(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize > MaximumSize? MaximumSize :pageSize;
        }
    }
}
