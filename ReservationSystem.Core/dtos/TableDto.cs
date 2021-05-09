using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class TableDto
    {
        public string Id { get; set; }
        public byte NumberOfPeople { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }
}
