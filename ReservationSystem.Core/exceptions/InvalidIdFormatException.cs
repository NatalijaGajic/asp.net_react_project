using System;

namespace ReservationSystem.Core.exceptions
{
    public class InvalidIdFormatException: Exception
    {
        public InvalidIdFormatException(string message)
             : base(message)
        {

        }
        public InvalidIdFormatException(string message, Exception inner)
             : base(message, inner)
        {

        }
    }
}
