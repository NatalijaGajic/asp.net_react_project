using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.contracts
{
    public class IntervalsForWorkDayReservationQueryParamsResponse
    {
        public List<Table> Tables { get; set; }
        public List<Game> Games { get; set; }

    }
}
