using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.exceptions;
using ReservationSystem.Core.services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntervalsForWorkDaysController : ControllerBase
    {
        private readonly IIntervalsForWorkDaysService _intervalsForWorkDayService;
        public IntervalsForWorkDaysController(IIntervalsForWorkDaysService intervalsForWorkDayService)
        {
            _intervalsForWorkDayService = intervalsForWorkDayService;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] IntervalsForWorkDayReservationQueryParams queryParams)
        {
            try
            {
                if (queryParams != null)
                {

                    return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDayReservation(queryParams));

                }
                return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDays());
            }
            catch(Exception e)
            {
                if (e.GetType().IsAssignableFrom(typeof(ReservationQueryParametersException)))
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
        public IActionResult GetIntervalsForWorkDayById(string id)
        {
            return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDay(id));
        }
    }
}
