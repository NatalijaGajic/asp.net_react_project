using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using ReservationSystem.Extensions;
using ReservationSystem.filters;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Controllers
{
    //TODO: Trim id in path
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
        [Authorize(Roles ="Worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetClientAccounts()
        {
            try
            {
                return Ok(_mapper.Map<List<ClientAccountDto>>(_accountsServices.GetClientAccounts()));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetClient")]
        [Authorize(Roles = "Worker")]
        //TODO: Client can get his own account
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetClientAccountById(string id)
        {
            try
            {
                ClientAccount c = _accountsServices.GetClientAccount(id);
                if(c == null)
                {
                    return NotFound("Client account with id not found");
                }
                return Ok(_mapper.Map<ClientAccountDto>(c));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ServiceFilter(typeof(UniqueClientAccountValidationFilter))]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddClientAccount(ClientAccountCreationDto clientAccount)
        {
            try
            {
                ClientAccount client = _mapper.Map<ClientAccount>(clientAccount);
                //TODO: Add role, AccountType
                //TODO: password hash
                client = _accountsServices.AddClientAccount(client);
                return CreatedAtRoute("GetClient", new { id = client.Id }, client);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        //TODO: should delete all reservations, authorization
        [HttpDelete("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteCilentAccount(string id)
        {
            try
            {
                
                if (_accountsServices.DeleteClientAccount(id))
                {
                    return NoContent();

                }
                return NotFound("Client account with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [ServiceFilter(typeof(UniqueClientAccountValidationFilter))]
        [HttpPut("{id}")]
        [Authorize(Roles = "Worker, Client")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateClient(string id, ClientAccountUpdateDto clientAccount)
        {
            try
            {
                string userId = HttpContext.GetUserId();
                if(userId != id)
                {
                    return BadRequest("You can't update an account you don't own");
                }
                ClientAccount client = _mapper.Map<ClientAccount>(clientAccount);
                client.Id = id;
                //TODO: asign role, Email, Password, AccountType from client or do partial update with Attach
                if (_accountsServices.UpdateClientAccount(client))
                {
                    return Ok();
                }
                return NotFound("Client account with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
    }
}
