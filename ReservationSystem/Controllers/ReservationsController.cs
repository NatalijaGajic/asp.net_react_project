using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.exceptions;
using ReservationSystem.Core.Exceptions;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using ReservationSystem.Extensions;

namespace ReservationSystem.Controllers
{
    //TODO: authorixation
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsService _reservationService;
        private readonly IMapper _mapper;
        private readonly IWorkDaysService _workDaysService;

        public ReservationsController(IReservationsService reservationService, 
            IMapper mapper, IWorkDaysService workDaysService)
        {
            _reservationService = reservationService;
            _mapper = mapper;
            _workDaysService = workDaysService;
        }

        [HttpGet]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                List<Reservation> reservations = _reservationService.GetReservations();
                List<ReservationDto> result = new List<ReservationDto>();
                foreach(Reservation res in reservations)
                {
                    WorkDay workDay = _workDaysService.GetWorkDay(res.WorkDayId);
                    ReservationDto dto = _mapper.Map<ReservationDto>(
                    res, opt =>
                    {
                        opt.Items["workDay"] = workDay;
                    });
                    result.Add(dto);
                }
                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpGet("{id}", Name = "GetReservation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetReservationById(string id)
        {
            try
            {
                Reservation res =_reservationService.GetReservation(id);
                if (res == null)
                {
                    return NotFound("Reservation with id not found");
                }
                Account acc = res.Account;
                // Regular user can get only his resrvations
                if(acc.Id != HttpContext.GetUserId() && HttpContext.GetUserRole() != "Worker")
                {
                    return BadRequest("You don't own reservation you are trying to get.");

                }
                WorkDay workDay = _workDaysService.GetWorkDay(res.WorkDayId);
                ReservationDto result = _mapper.Map<ReservationDto>(
                res, opt =>
                {
                    opt.Items["workDay"] = workDay;
                });
                return Ok(result);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet("account/{id}", Name = "GetReservationsForAccount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetReservationsForAccount(string id)
        {
            try
            {
                if (id != HttpContext.GetUserId() && HttpContext.GetUserRole() != "Worker")
                {
                    return BadRequest("You don't own reservations you are trying to get.");

                }
                List<Reservation> reservations = _reservationService.GetReservationsForAccount(id);
                List<ReservationDto> result = new List<ReservationDto>();
                foreach (Reservation res in reservations)
                {
                    WorkDay workDay = _workDaysService.GetWorkDay(res.WorkDayId);
                    ReservationDto dto = _mapper.Map<ReservationDto>(
                    res, opt =>
                    {
                        opt.Items["workDay"] = workDay;
                    });
                    result.Add(dto);
                }
                return Ok(result);

            }
            catch (Exception ex)
            {
                if (ex.GetType().IsAssignableFrom(typeof(InvalidForeignKeyException)))
                {
                    //TODO: Appropriate statuse code
                    return StatusCode(StatusCodes.Status409Conflict, ex.Message);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddReservation(ReservationCreationDto reservation)
        {
            try
            {
                Reservation res = _mapper.Map<Reservation>(reservation);
                res = _reservationService.AddReservation(res);
                return CreatedAtRoute("GetReservation", new { id = res.Id }, res);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteReservation(string id)
        {
            try
            {
                if (_reservationService.DeleteReservation(id))
                {
                    return NoContent();
                }
                return NotFound("Reservation with id not found");
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpPut("cancel/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult CancelReservation(string id)
        {
            try
            {
                Reservation reservation = _reservationService.GetReservation(id);
                if (reservation == null) {

                    return NotFound("Reservation with id not found");
                }
                Account acc = reservation.Account;
                // User can cancel only his resrvations
                if (acc.Id != HttpContext.GetUserId())
                {
                    return BadRequest("You don't own reservation you are trying to cancel");

                }
                if (_reservationService.CancelReservation(id, reservation.Account.Role.Name))
                {
                    return StatusCode(StatusCodes.Status200OK, "Successfully cancelled");

                }
                return NotFound("Reservation with id not found");

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
