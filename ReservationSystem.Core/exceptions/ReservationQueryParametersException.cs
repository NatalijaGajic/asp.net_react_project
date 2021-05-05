using System;

namespace ReservationSystem.Core.exceptions
{
    public class ReservationQueryParametersException: Exception
    {
        public ReservationQueryParametersException()
        {

        }
        public ReservationQueryParametersException(string message)
             : base(message)
        {

        }
        public ReservationQueryParametersException(string message, Exception inner)
             : base(message, inner)
        {

        }
    }
}
