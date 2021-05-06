using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.exceptions
{
    public class InvalidGamesQueryParamsException: Exception
    {
        public InvalidGamesQueryParamsException()
        {

        }
        public InvalidGamesQueryParamsException(string message)
             : base(message)
        {

        }
        public InvalidGamesQueryParamsException(string message, Exception inner)
             : base(message, inner)
        {

        }
    }
}
