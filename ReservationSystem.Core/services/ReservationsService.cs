﻿using MongoDB.Driver;
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
        public ReservationsService(IReservationsRepository reservationsRepository)
        {
            _reservationsRepository = reservationsRepository;
        }
        public Reservation AddReservation(Reservation reservation)
        {
            _reservationsRepository.AddReservation(reservation);
            return reservation;
        }

        public void DeleteReservation(string id)
        {
            _reservationsRepository.DeleteReservation(id);
        }

        public Reservation GetReservation(string id)
        {
            return _reservationsRepository.GetReservation(id);
        }

        public List<Reservation> GetReservations()
        {
            return _reservationsRepository.GetReservations();
        }

        public Reservation UpdateReservation(Reservation reservation)
        {
            //TODO: Reservation can only be cancelled, remote procedure call
            _reservationsRepository.GetReservation(reservation.Id);
            _reservationsRepository.UpdateReservation(reservation);
            return reservation;
        }
    }
}
