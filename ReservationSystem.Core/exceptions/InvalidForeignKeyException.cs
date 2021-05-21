using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.Exceptions
{
    public class InvalidForeignKeyException: Exception
    {
        public InvalidForeignKeyException(string message)
     : base(message)
        {

        }
        public InvalidForeignKeyException(string message, Exception inner)
             : base(message, inner)
        {

        }
    }
}
