using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IIntervalsForWorkDayService _intervalsForWorkDayService;
        public IntervalsForWorkDaysController(IIntervalsForWorkDayService intervalsForWorkDayService)
        {
            _intervalsForWorkDayService = intervalsForWorkDayService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDays());
        }

        [HttpGet("{id}", Name = "GetIntervalsForWorkDay")]
        public IActionResult GetIntervalsForWorkDayById(string id)
        {
            return Ok(_intervalsForWorkDayService.GetIntervalsForWorkDay(id));
        }
    }
}
