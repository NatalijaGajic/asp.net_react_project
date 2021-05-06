using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.contracts
{
    public class GamesQueryParams
    {
        public String SearchByName { get; set; }
        public int NumberOfPeople { get; set; }
        public bool IsActive { get; set; }
        public String OrderBy { get; set; }
    }
}
