using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class IntervalForWorkDay
    {
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public List<Table> FreeTables { get; set; }
        public List<Game> FreeGames { get; set; }
    }
}
