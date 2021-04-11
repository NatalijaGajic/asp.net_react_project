using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;


namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkDaysController : ControllerBase
    {
        private readonly IWorksDaysService _workDaysService;
        public WorkDaysController(IWorksDaysService workDaysService)
        {
            _workDaysService = workDaysService;
        }

        [HttpGet]
        public IActionResult Get()
        {
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
