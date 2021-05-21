using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class ReservationsRepository : IReservationsRepository
    {
        private readonly IMongoCollection<Reservation> _reservations;
        public ReservationsRepository(IDBClient dbClient)
        {
            _reservations = dbClient.GetReservationsCollection();
        }
        public Reservation AddReservation(Reservation reservation)
        {
            _reservations.InsertOne(reservation);
            return reservation;
        }

        public int DeleteReservation(string id)
        {
            DeleteResult result = _reservations.DeleteOne(r => r.Id == id);
            return (int)result.DeletedCount;
        }

        public Reservation GetReservation(string id)
        {
            return _reservations.Find(r => r.Id == id).FirstOrDefault();
        }

        public List<Reservation> GetReservations()
        {
            return _reservations.Find(r => true).ToList();
        }

        public bool UpdateReservation(Reservation reservation)
        {
            //TODO: Reservation can only be cancelled, remote procedure call
            ReplaceOneResult res =_reservations.ReplaceOne(r => r.Id == reservation.Id, reservation);
            return res.MatchedCount > 0;
        }
    }
}
