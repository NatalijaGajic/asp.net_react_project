using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemRolesController : ControllerBase
    {
        private readonly ISystemRolesService _systemRolesService;
        private readonly IMapper _mapper;

        public SystemRolesController(ISystemRolesService systemRolesService, IMapper mapper)
        {
            _systemRolesService = systemRolesService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                return Ok(_mapper.Map<List<SystemRoleDto>>(_systemRolesService.GetSystemRoles()));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetSystemRole")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetSystemRoleById(string id)
        {
            try
            {
                SystemRole role = _systemRolesService.GetSystemRole(id);
                if (role == null)
                {
                    return NotFound("System role with id not found");
                }
                return Ok(_mapper.Map<SystemRoleDto>(role));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddSystemRole(SystemRoleCreationDto systemRole)
        {
            try
            {
                SystemRole sr = _mapper.Map<SystemRole>(systemRole);
                sr = _systemRolesService.AddSystemRole(sr);
                return CreatedAtRoute("GetSystemRole", new { id = sr.Id }, sr);
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
        public IActionResult DeleteSystemRole(string id)
        {
            try
            {
                if (_systemRolesService.DeleteSystemRole(id))
                {
                    return NoContent();

                }
                return NotFound("System role with id not found");
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
        public IActionResult UpdateSystemRole(string id, SystemRoleUpdateDto systemRole)
        {
            try
            {
                SystemRole sr = _mapper.Map<SystemRole>(systemRole);
                sr.Id = id;
                //TODO: asign role, Email, Password, AccountType from client or do partial update with Attach
                if (_systemRolesService.UpdateSystemRole(sr))
                {
                    return Ok();
                }
                return NotFound("System role with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
