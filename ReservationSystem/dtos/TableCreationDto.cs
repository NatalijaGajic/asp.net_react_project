using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.dtos
{
    public class TableCreationDto
    {
        public byte NumberOfPeople { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }
}
