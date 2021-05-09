using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class PaymentCreationDto
    {
        //Price should be gameprice*(endhour - start hour)
        public decimal Price { get; set; }
        public string Valute { get; set; }
        public DateTime DateTime { get; set; }
        public string WorkerAccountId { get; set; }
        public String ReservationId { get; set; }
    }
}
