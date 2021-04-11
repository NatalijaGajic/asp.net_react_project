using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public interface IReservationService
    {
        List<Reservation> GetReservations();
        Reservation AddReservation(Reservation reservation);
        Reservation GetReservation(string id);
        void DeleteReservation(string id);
        Reservation UpdateReservation(Reservation reservation);
    }
}
