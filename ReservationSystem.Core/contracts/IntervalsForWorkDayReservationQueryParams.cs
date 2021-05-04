using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.contracts
{
    public class IntervalsForWorkDayReservationQueryParams
    {
        public String WorkDayId { get; set; }
        public String StartHour { get; set; }
        public String EndHour { get; set; }
        public String NumberOfPeople { get; set; }
        public String GameId { get; set; }
    }
}
