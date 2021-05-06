using System;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReservationSystem.Core;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.exceptions;

namespace ReservationSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly IGamesService _gamesServices;
        private readonly IMapper _mapper;


        public GamesController(IGamesService gamesServices, IMapper mapper)
        {
            _gamesServices = gamesServices;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] PaginationQuery paginationQuery, [FromQuery] GamesQueryParams gamesQueryParams)
        {
            try
            {
                return Ok(_gamesServices.GetGames(paginationQuery, gamesQueryParams));
            }
            catch (Exception e)
            {
                if (e.GetType().IsAssignableFrom(typeof(InvalidGamesQueryParamsException)))
                {
                    return BadRequest(e.Message);

                }
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}", Name = "GetGame")]
        public IActionResult GetGameById(string id)
        {
            return Ok(_gamesServices.GetGame(id));
        }


        [HttpPost]
        public IActionResult AddGame([FromBody] GameCreationDto game)
        {
            try
            {
                Game g = _mapper.Map<Game>(game);
                _gamesServices.AddGame(g);
                return CreatedAtRoute("GetGame", new { id = g.Id }, g);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

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
