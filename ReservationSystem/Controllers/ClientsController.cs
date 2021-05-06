using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using ReservationSystem.filters;
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
        private readonly IMapper _mapper;
        public ClientsController(IAccountsService accountsServices, IMapper mapper)
        {
            _accountsServices = accountsServices;
            _mapper = mapper;
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

        [ServiceFilter(typeof(UniqueAccountFilter))]
        [HttpPost]
        public IActionResult AddClient(ClientAccountCreationDto clientAccount)
        {
            ClientAccount client = _mapper.Map<ClientAccount>(clientAccount);
            //TODO: Add role, AccountType
            _accountsServices.AddClientAccount(client);
            return CreatedAtRoute("GetClient", new { id = client.Id }, client);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCilent(string id)
        {
            _accountsServices.DeleteClientAccount(id);
            return NoContent();
        }

        [ServiceFilter(typeof(UniqueAccountFilter))]
        [HttpPut("{id}")]
        public IActionResult UpdateClient(string id, ClientAccountCreationDto clientAccount)
        {
            ClientAccount client = _mapper.Map<ClientAccount>(clientAccount);
            client.Id = id;
            //TODO: asign role, Email, Password, AccountType from client or do partial update with Attach
            return Ok(_accountsServices.UpdateClientAccount(client));
        }
    }
}
