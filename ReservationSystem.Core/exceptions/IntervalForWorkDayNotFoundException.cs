using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.exceptions
{
    public class IntervalForWorkDayNotFoundException: Exception
    {
        public IntervalForWorkDayNotFoundException()
        {

        }
        public IntervalForWorkDayNotFoundException(string message)
             : base(message)
        {

        }
        public IntervalForWorkDayNotFoundException(string message, Exception inner)
             : base(message, inner)
        {

        }
    }
}
