using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReservationSystem.Core;

namespace ReservationSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGamesServices _gamesServices;
        public GamesController(IGamesServices gamesServices)
        {
            _gamesServices = gamesServices;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gamesServices.GetGames());
        }

        [HttpGet("{id}", Name = "GetGame")]
        public IActionResult GetGameById(string id)
        {
            return Ok(_gamesServices.GetGame(id));
        }


        [HttpPost]
        public IActionResult AddGame(Game game)
        {
            _gamesServices.AddGame(game);
            return CreatedAtRoute("GetGame", new { id = game.Id }, game);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGame(string id)
        {
            _gamesServices.DeleteGame(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGame(string id, Game game)
        {
            game.Id = id;
            return Ok(_gamesServices.UpdateGame(game));
        }
    }
}
