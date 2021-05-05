using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;
using System;

namespace ReservationSystem.Controllers
{
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
        public IActionResult Get()
        {
            return Ok(_tablesService.GetTables());
        }

        [HttpGet("{id}", Name = "GetTable")]
        public IActionResult GetTableById(string id)
        {
            return Ok(_tablesService.GetTable(id));
        }


        [HttpPost]
        public IActionResult AddTable([FromBody] TableCreationDto table)
        {
            try
            {
                Table t = _mapper.Map<Table>(table);
                Table createdTable = _tablesService.AddTable(t);
                return CreatedAtRoute("GetTable", new { id = createdTable.Id }, createdTable);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTable(string id)
        {
            _tablesService.DeleteTable(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTable(string id, Table table)
        {
            table.Id = id;
            return Ok(_tablesService.UpdateTable(table));
        }
    }
}
