using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;

namespace ReservationSystem.Controllers
{
    [Authorize(Roles ="Worker")]
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ITablesService _tablesService;
        private readonly IMapper _mapper;
        public TablesController(ITablesService tablesService, IMapper mapper)
        {
            _tablesService = tablesService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get()
        {
            try
            {
                return Ok(_tablesService.GetTables());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpGet("{id}", Name = "GetTable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetTableById(string id)
        {
            try
            {
                Table t = _tablesService.GetTable(id);
                if (t == null)
                {
                    return NotFound("Table with id not found");
                }
                return Ok(_mapper.Map<TableDto>(t));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddTable([FromBody] TableCreationDto table)
        {
            try
            {
                Table t = _mapper.Map<Table>(table);
                Table createdTable = _tablesService.AddTable(t);
                return CreatedAtRoute("GetTable", new { id = createdTable.Id }, createdTable);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteTable(string id)
        {
            try
            {
                if (_tablesService.DeleteTable(id))
                {
                    return NoContent();

                }
                return NotFound("Table with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            ;
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateTable(string id, TableUpdateDto table)
        {
            try
            {
                Table t = _mapper.Map<Table>(table);
                t.Id = id;
                //TODO: asign role, Email, Password, AccountType from client or do partial update with Attach
                if (_tablesService.UpdateTable(t))
                {
                    return Ok();
                }
                return NotFound("Table with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
