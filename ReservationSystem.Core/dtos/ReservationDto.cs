using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class ReservationDto
    {
        public string Id { get; set; }
        public string FirstAndLastName { get; set; }
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public byte Hours { get; set; }
        public byte NumberOfPeople { get; set; }
        public bool IsCancelled { get; set; }
        public Account Account { get; set; }
        public Game Game { get; set; }
        public Table Table { get; set; }
        public WorkDay workDay { get; set; }
    }
}
