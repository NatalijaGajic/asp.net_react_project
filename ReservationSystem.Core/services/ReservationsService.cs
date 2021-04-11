using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class ReservationsService : IReservationsService
    {
        private readonly IMongoCollection<Reservation> _reservations;
        public ReservationsService(IDBClient dbClient)
        {
            _reservations = dbClient.GetReservationsCollection();
        }
        public Reservation AddReservation(Reservation reservation)
        {
            _reservations.InsertOne(reservation);
            return reservation;
        }

        public void DeleteReservation(string id)
        {
            _reservations.DeleteOne(r => r.Id == id);
        }

        public Reservation GetReservation(string id)
        {
            return _reservations.Find(r => r.Id == id).First();
        }

        public List<Reservation> GetReservations()
        {
            return _reservations.Find(r => true).ToList();
        }

        public Reservation UpdateReservation(Reservation reservation)
        {
            GetReservation(reservation.Id);
            _reservations.ReplaceOne(r => r.Id == reservation.Id, reservation);
            return reservation;
        }
    }
}
