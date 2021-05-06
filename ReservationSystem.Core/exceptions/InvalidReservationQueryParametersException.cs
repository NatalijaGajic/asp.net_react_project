using System;

namespace ReservationSystem.Core.exceptions
{
    public class InvalidReservationQueryParametersException: Exception
    {
        public InvalidReservationQueryParametersException()
        {

        }
        public InvalidReservationQueryParametersException(string message)
             : base(message)
        {

        }
        public InvalidReservationQueryParametersException(string message, Exception inner)
             : base(message, inner)
        {

        }
    }
}
