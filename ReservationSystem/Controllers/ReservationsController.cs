using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
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
        private readonly IReservationsService _reservationService;
        private readonly IMapper _mapper;

        public ReservationsController(IReservationsService reservationService, IMapper mapper)
        {
            _reservationService = reservationService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                return Ok(_mapper.Map<List<ReservationDto>>(_reservationService.GetReservations()));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
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
