using System;
using System.Collections.Generic;
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
    [Route("api/[controller]")]
    //TODO: DTO mapping
    public class GamesController : ControllerBase
    {
        private readonly IGamesService _gamesServices;
        private readonly IMapper _mapper;


        public GamesController(IGamesService gamesServices, IMapper mapper)
        {
            _gamesServices = gamesServices;
            _mapper = mapper;
        }

        [HttpGet("filtered/games")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetFiltered([FromQuery] PaginationQuery paginationQuery, [FromQuery] GamesQueryParams gamesQueryParams)
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

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Get([FromQuery] PaginationQuery paginationQuery)
        {
            try
            {
                return Ok(_gamesServices.GetAllGames(paginationQuery));
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetGameById(string id)
        {
            try
            {
                Game game = _gamesServices.GetGame(id);
                if (game == null)
                {
                    return NotFound("Game with id not found");
                }
                return Ok(_mapper.Map<GameDto>(game));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult AddGame([FromBody] GameCreationDto game)
        {
            try
            {
                Game g = _mapper.Map<Game>(game);
                g = _gamesServices.AddGame(g);
                return CreatedAtRoute("GetGame", new { id = g.Id }, g);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteGame(string id)
        {
            try
            {
                //TODO: check id format
                if (_gamesServices.DeleteGame(id))
                {
                    return NoContent();

                }
                return NotFound("Game with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateGame(string id, GameUpdateDto game)
        {
            try
            {
                Game g = _mapper.Map<Game>(game);
                g.Id = id;
                //TODO: check id format
                if (_gamesServices.UpdateGame(g))
                {
                    return Ok();
                }
                return NotFound("Game with id not found");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
