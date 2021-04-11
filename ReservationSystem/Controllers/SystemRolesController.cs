using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core.models;
using ReservationSystem.Core.services;


namespace ReservationSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemRolesController : ControllerBase
    {
        private readonly ISystemRolesService _systemRolesService;
        public SystemRolesController(ISystemRolesService systemRolesService)
        {
            _systemRolesService = systemRolesService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_systemRolesService.GetSystemRoles());
        }

        [HttpGet("{id}", Name = "GetSystemRole")]
        public IActionResult GetSystemRoleById(string id)
        {
            return Ok(_systemRolesService.GetSystemRole(id));
        }


        [HttpPost]
        public IActionResult AddSystemRole(SystemRole systemRole)
        {
            _systemRolesService.AddSystemRole(systemRole);
            return CreatedAtRoute("GetSystemRole", new { id = systemRole.Id }, systemRole);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSystemRole(string id)
        {
            _systemRolesService.DeleteSystemRole(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateSystemRole(string id, SystemRole systemRole)
        {
            systemRole.Id = id;
            return Ok(_systemRolesService.UpdateSystemRole(systemRole));
        }
    }
}
