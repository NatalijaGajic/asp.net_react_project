using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class GameTimeInterval
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public List<Game> FreeGames { get; set; }

    }
}
