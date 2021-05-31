using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class ClientAccount: Account
    {
        public byte Penalty { get; set; }
        public DateTime? DateOfLastPenalty { get; set; }

    }
}
