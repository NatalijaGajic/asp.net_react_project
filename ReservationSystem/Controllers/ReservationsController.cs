using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationService _reservationService;
        public ReservationsController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_reservationService.GetReservations());
        }

        [HttpGet("{id}", Name = "GetReservation")]
        public IActionResult GetReservationById(string id)
        {
            return Ok(_reservationService.GetReservation(id));
        }


        [HttpPost]
        public IActionResult AddReservation(Reservation reservation)
        {
            _reservationService.AddReservation(reservation);
            return CreatedAtRoute("GetReservation", new { id = reservation.Id }, reservation);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteReservation(string id)
        {
            _reservationService.DeleteReservation(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateReservation(string id, Reservation reservation)
        {
            reservation.Id = id;
            return Ok(_reservationService.UpdateReservation(reservation));
        }
    }
}
