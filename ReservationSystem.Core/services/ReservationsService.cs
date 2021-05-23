using MongoDB.Driver;
using ReservationSystem.Core.Exceptions;
using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class ReservationsService : IReservationsService
    {
        private readonly IReservationsRepository _reservationsRepository;
        private readonly IAccountsService _accountsService;

        public ReservationsService(IReservationsRepository reservationsRepository, IAccountsService accountsService)
        {
            _reservationsRepository = reservationsRepository;
            _accountsService = accountsService;
        }
        public Reservation AddReservation(Reservation reservation)
        {
            _reservationsRepository.AddReservation(reservation);
            return reservation;
        }

        public bool CancelReservation(string id)
        {
            Reservation reservation = _reservationsRepository.GetReservation(id);
            if (reservation == null)
            {
                return false;
            }
            //TODO: Check penalties and date of reservation 
            reservation.IsCancelled = true;
            return _reservationsRepository.UpdateReservation(reservation);

        }

        public bool DeleteReservation(string id)
        {
            return _reservationsRepository.DeleteReservation(id) > 0;
        }

        public Reservation GetReservation(string id)
        {
           return _reservationsRepository.GetReservation(id);
        }

        public List<Reservation> GetReservations()
        {
            return _reservationsRepository.GetReservations();
        }

        public List<Reservation> GetReservationsForAccount(string id)
        {
            //TODO: Worker can also make reservations
            ClientAccount client = _accountsService.GetClientAccount(id);
            if(client == null)
            {
                throw new InvalidForeignKeyException("Invalid account id");
            }
            return _reservationsRepository.GetReservationsForAccount(id);
        }

        public bool UpdateReservation(Reservation reservation)
        {
            //TODO: Reservation can only be cancelled, remote procedure call
            Reservation res = _reservationsRepository.GetReservation(reservation.Id);
            if(res == null)
            {
                return false;
            }
            return _reservationsRepository.UpdateReservation(reservation);
        }
    }
}
