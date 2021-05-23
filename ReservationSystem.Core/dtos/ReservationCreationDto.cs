using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.dtos
{
    public class ReservationCreationDto
    {
        public string FirstAndLastName { get; set; }
        public int StartHour { get; set; }
        public int EndHour { get; set; }
        public byte Hours { get; set; }
        public byte NumberOfPeople { get; set; }
        //TODO: set is cancelled to false
        //TODO: Not all fields of account, only account info
        public Account Account { get; set; }
        public Game Game { get; set; }
        public Table Table { get; set; }
        public WorkDay WorkDay { get; set; }
    }
}
