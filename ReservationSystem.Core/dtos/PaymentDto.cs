using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class PaymentDto
    {
        public string Id { get; set; }
        public decimal Price { get; set; }
        public string Valute { get; set; }
        public DateTime DateTime { get; set; }
        public WorkerAccount Worker { get; set; }
        public Reservation Reservation { get; set; }
    }
}
