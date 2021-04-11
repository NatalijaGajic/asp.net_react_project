

namespace ReservationSystem.Core
{
    public class ReservationSystemDBConfig
    {
        public string Database_Name { get; set; }
        public string Games_Collection_Name { get; set; }
        public string Tables_Collection_Name { get; set; }

        public string Workers_Collection_Name { get; set; }
        public string Clients_Collection_Name { get; set; }
        public string System_Roles_Collection_Name { get; set; }
        public string Payments_Collection_Name { get; set; }


        public string Work_Days_Collection_Name { get; set; }

        public string Reservations_Collection_Name { get; set; }
        public string Intervals_For_Work_Days_Collection_Name { get; set; }
        public string Connection_String { get; set; }


    }
}
