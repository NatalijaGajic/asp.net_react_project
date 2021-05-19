using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.dtos;
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
        private readonly IMapper _mapper;

        public WorkDaysController(IWorkDaysService workDaysService, IMapper mapper)
        {
            _workDaysService = workDaysService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetWorkDays([FromQuery] WorkDaysQueryParams queryParams)
        {
            try
            {
                if (queryParams != null && queryParams.Date != null)
                {
                    try
                    {
                        //TODO: make date in WorkDaysQueryParams type datetime validation easier
                        return Ok(_workDaysService.GetWorkDayByDate(queryParams));
                    }
                    catch (Exception e)
                    {
                        return BadRequest(e.Message);
                    }
                }
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

            return Ok(_workDaysService.GetWorkDays());
        }


        [HttpGet("{id}", Name = "GetWorkDay")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetWorkDayById(string id)
        {
            try
            {
                WorkDay w = _workDaysService.GetWorkDay(id);
                if (w == null)
                {
                    return NotFound("Work day with id not found");
                }
                return Ok(_mapper.Map<WorkDayDto>(w));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //TODO: date should be unique and work days should have schema
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddWorkDay(WorkDayCreationDto workDay)
        {
            try
            {
                WorkDay wd = _mapper.Map<WorkDay>(workDay);
                wd = _workDaysService.AddWorkDay(wd);
                return CreatedAtRoute("GetWorkDay", new { id = wd.Id }, wd);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteWorkDay(string id)
        {
            try
            {
                if (_workDaysService.DeleteWorkDay(id))
                {
                    return NoContent();

                }
                return NotFound("Work day with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            ;
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateWorkDay(string id, WorkDayUpdateDto workDay)
        {
            try
            {
                WorkDay wd = _mapper.Map<WorkDay>(workDay);
                wd.Id = id;
                //TODO: asign date
                if (_workDaysService.UpdateWorkDay(wd))
                {
                    return Ok();
                }
                return NotFound("Work day with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
