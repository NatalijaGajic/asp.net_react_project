using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.models
{
    public class WorkerAccount: Account
    {
        public DateTime StartContractDate { get; set;}
        public DateTime? EndContractDate { get; set;}

    }
}
