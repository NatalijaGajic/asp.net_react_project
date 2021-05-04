using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;

namespace ReservationSystem.Controllers
{
    [Route("api/workDays")]
    [ApiController]
    public class WorkDaysController : ControllerBase
    {
        private readonly IWorkDaysService _workDaysService;
        public WorkDaysController(IWorkDaysService workDaysService)
        {
            _workDaysService = workDaysService;
        }

        [HttpGet]
        public IActionResult GetWorkDays([FromQuery] WorkDaysQueryParams queryParams)
        {
            if (queryParams != null && queryParams.Date != null)
            {
                try{
                    _workDaysService.GetWorkDayByDate(queryParams);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
            return Ok(_workDaysService.GetWorkDays());
        }

        [HttpGet("{id}", Name = "GetWorkDay")]
        public IActionResult GetWorkDayById(string id)
        {
            return Ok(_workDaysService.GetWorkDay(id)); 
        }


        [HttpPost]
        public IActionResult AddWorkDay(WorkDay workDay)
        {
            _workDaysService.AddWorkDay(workDay);
            return CreatedAtRoute("GetGame", new { id = workDay.Id }, workDay);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWorkDay(string id)
        {
            _workDaysService.DeleteWorkDay(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWorkDay(string id, WorkDay workDay)
        {
            workDay.Id = id;
            return Ok(_workDaysService.UpdateWorkDay(workDay));
        }
    }
}
