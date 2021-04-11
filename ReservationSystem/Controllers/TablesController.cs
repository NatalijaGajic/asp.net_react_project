using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;


namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ITablesService _tablesService;
        public TablesController(ITablesService tablesService)
        {
            _tablesService = tablesService;
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
        public IActionResult AddTable(Table table)
        {
            _tablesService.AddTable(table);
            return CreatedAtRoute("GetTable", new { id = table.Id }, table);
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
