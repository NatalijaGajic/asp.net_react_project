using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class IntervalsForWorkDayDto
    {
        public string Id { get; set; }
        public string WorkDayId { get; set; }

        public List<IntervalForWorkDay> FreeTimeIntervals { get; set; }
    }
}
