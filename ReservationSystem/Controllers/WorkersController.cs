using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public WorkersController(IAccountsService accountsServices)
        {
            _accountsServices = accountsServices;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_accountsServices.GetClientAccounts());
        }

        [HttpGet("{id}", Name = "GetWorker")]
        public IActionResult GetWirkerById(string id)
        {
            return Ok(_accountsServices.GetWorkerAccount(id));
        }


        [HttpPost]
        public IActionResult AddWorker(WorkerAccount workerAccount)
        {
            _accountsServices.AddWorkerAccount(workerAccount);
            return CreatedAtRoute("GetWorker", new { id = workerAccount.Id }, workerAccount);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWorker(string id)
        {
            _accountsServices.DeleteWorkerAccount(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWorker(string id, WorkerAccount workerAccount)
        {
            workerAccount.Id = id;
            return Ok(_accountsServices.UpdateWorkerAccount(workerAccount));
        }
    }
}
