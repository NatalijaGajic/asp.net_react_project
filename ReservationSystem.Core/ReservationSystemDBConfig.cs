

namespace ReservationSystem.Core
{
    public class ReservationSystemDBConfig
    {
        public string Database_Name { get; set; }
        public string Games_Collection_Name { get; set; }
        public string Tables_Collection_Name { get; set; }

        public string Workers_Collection_Name { get; set; }
        public string Clients_Collection_Name { get; set; }
        public string SystemRoles_Collection_Name { get; set; }
        public string Payments_Collection_Name { get; set; }


        public string WorkDays_Collection_Name { get; set; }

        public string Reservations_Collection_Name { get; set; }
        public string IntervalsForWorkDays_Collection_Name { get; set; }
        public string Connection_String { get; set; }


    }
}
