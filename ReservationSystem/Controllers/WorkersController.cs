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
    public class WorkersController : ControllerBase
    {
        private readonly IAccountsService _accountsServices;
        private readonly IMapper _mapper;
        public WorkersController(IAccountsService accountsServices, IMapper mapper)
        {
            _accountsServices = accountsServices;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                return Ok(_mapper.Map<List<WorkerAccountDto>>(_accountsServices.GetWorkerAccounts()));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpGet("{id}", Name = "GetWorker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetWorkerById(string id)
        {
            try
            {
                WorkerAccount w = _accountsServices.GetWorkerAccount(id);
                if (w == null)
                {
                    return NotFound("Worker account with id not found");
                }
                return Ok(_mapper.Map<WorkerAccountDto>(w));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddWorker(WorkerAccountCreationDto workerAccount)
        {
            try
            {
                WorkerAccount worker = _mapper.Map<WorkerAccount>(workerAccount);
                worker = _accountsServices.AddWorkerAccount(worker);
                ;
                return CreatedAtRoute("GetWorker", new { id = worker.Id }, worker);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWorker(string id)
        {
            try
            {
                if (_accountsServices.DeleteWorkerAccount(id))
                {
                    return NoContent();

                }
                return NotFound("Worker account with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWorker(string id, WorkerAccount workerAccount)
        {
            workerAccount.Id = id;
            return Ok(_accountsServices.UpdateWorkerAccount(workerAccount));
        }
    }
}
