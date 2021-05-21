using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public interface IReservationsRepository
    {
        List<Reservation> GetReservations();
        Reservation AddReservation(Reservation reservation);
        Reservation GetReservation(string id);
        int DeleteReservation(string id);
        bool UpdateReservation(Reservation reservation);
    }
}
