using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.exceptions;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervalsForWorkDaysController : ControllerBase
    {
        private readonly IIntervalsForWorkDaysService _intervalsForWorkDayService;
        private readonly IMapper _mapper;
        public IntervalsForWorkDaysController(IIntervalsForWorkDaysService intervalsForWorkDayService, IMapper mapper)
        {
            _intervalsForWorkDayService = intervalsForWorkDayService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get([FromQuery] IntervalsForWorkDayReservationQueryParams queryParams)
        {
            try
            {
                if (queryParams != null)
                {
                    //TODO: QueryParamsResponseDto
                    return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDayReservation(queryParams));

                }
                return Ok(_mapper.Map<List<IntervalsForWorkDayDto>>(_intervalsForWorkDayService.GetIntervalsForWorkDays()));
            }
            catch(Exception e)
            {
                if (e.GetType().IsAssignableFrom(typeof(InvalidReservationQueryParametersException)))
                {
                    return BadRequest(e.Message);

                }
                else if (e.GetType().IsAssignableFrom(typeof(IntervalForWorkDayNotFoundException)))
                {
                    return NotFound(e.Message);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
                }
            }
            
        }

        [HttpGet("{id}", Name = "GetIntervalsForWorkDay")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetIntervalsForWorkDayById(string id)
        {

            try
            {
                IntervalsForWorkDay intervals = _intervalsForWorkDayService.GetIntervalsForWorkDay(id);
                if (intervals == null)
                {
                    return NotFound("Client account with id not found");
                }
                return Ok(_mapper.Map<IntervalsForWorkDayDto>(intervals));
            }
            catch (Exception ex)
            {
                if (ex.GetType().IsAssignableFrom(typeof(InvalidIdFormatException)))
                {
                    return BadRequest(ex.Message);
                }
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }
    }
}
