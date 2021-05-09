using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class WorkDayDto
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public bool IsWorkDay { get; set; }
        public WorkDayScheme WorkDayScheme { get; set; }
    }
}
