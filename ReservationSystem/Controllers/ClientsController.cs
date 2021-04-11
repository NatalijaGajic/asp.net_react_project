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
    public class ClientsController : ControllerBase
    {
        private readonly IAccountsService _accountsServices;
        public ClientsController(IAccountsService accountsServices)
        {
            _accountsServices = accountsServices;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_accountsServices.GetClientAccounts());
        }

        [HttpGet("{id}", Name = "GetClient")]
        public IActionResult GetClientById(string id)
        {
            return Ok(_accountsServices.GetClientAccount(id));
        }


        [HttpPost]
        public IActionResult AddClient(ClientAccount clientAccount)
        {
            _accountsServices.AddClientAccount(clientAccount);
            return CreatedAtRoute("GetClient", new { id = clientAccount.Id }, clientAccount);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCilent(string id)
        {
            _accountsServices.DeleteClientAccount(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateClient(string id, ClientAccount clientAccount)
        {
            clientAccount.Id = id;
            return Ok(_accountsServices.UpdateClientAccount(clientAccount));
        }
    }
}
