using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public interface IReservationsService
    {
        List<Reservation> GetReservations();
        Reservation AddReservation(Reservation reservation);
        Reservation GetReservation(string id);
        bool DeleteReservation(string id);
        bool UpdateReservation(Reservation reservation);
        bool CancelReservation(string id, string roleName);
        public List<Reservation> GetReservationsForAccount(string id);
    }
}
