using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class WorkDayUpdateDto
    {
        public bool IsWorkDay { get; set; }
        public WorkDayScheme WorkDayScheme { get; set; }
    }
}
