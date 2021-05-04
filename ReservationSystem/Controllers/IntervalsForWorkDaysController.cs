using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.contracts;
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
            if(queryParams != null)
            {
                try
                {
                    return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDayReservation(queryParams));
                }
                catch (Exception e) {
                    return BadRequest(e.Message);
                } 
            }
            return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDays());
        }

        [HttpGet("{id}", Name = "GetIntervalsForWorkDay")]
        public IActionResult GetIntervalsForWorkDayById(string id)
        {
            return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDay(id));
        }
    }
}
