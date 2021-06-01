using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IWebHostEnvironment _hostEnvironment;

        public GamesController(IGamesService gamesServices, IMapper mapper, IWebHostEnvironment hostEnvironment)
        {
            _gamesServices = gamesServices;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet("all-games")]
        [Authorize(Roles ="Worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllGames()
        {
            try
            { 
                List<Game> games = _gamesServices.GetAllGames();
                List<GameDto> result = new List<GameDto>();
                foreach (Game game in games)
                {
                    string imagePath = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, game.ImageName);
                    GameDto dto = _mapper.Map<GameDto>(game, opt =>
                    {
                        opt.Items["ImagePath"] = imagePath;
                    });
                    result.Add(dto);
                }
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet("filtered/games")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetFiltered([FromQuery] PaginationQuery paginationQuery, [FromQuery] GamesQueryParams gamesQueryParams)
        {
            try
            { 
                PagedResponse<Game> response = _gamesServices.GetGames(paginationQuery, gamesQueryParams);
                List<Game> games = (List<Game>)response.Data;
                List<GameDto> result = new List<GameDto>();
                foreach (Game game in games)
                {
                    string imagePath = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, game.ImageName);
                    GameDto dto = _mapper.Map<GameDto>(game, opt =>
                    {
                        opt.Items["ImagePath"] = imagePath;
                    });
                    result.Add(dto);
                }
                PagedResponse<GameDto> res = new PagedResponse<GameDto>(response.PageNumber, response.PageSize, response.NextPage, response.PreviousPage, response.NumberOfPages);res.Data = result;
                return Ok(res);
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
                PagedResponse<Game> response = _gamesServices.GetAllGames(paginationQuery);
                List<Game> games = response.Data;
                List<GameDto> result = new List<GameDto>();
                foreach (Game game in games)
                {
                    string imagePath = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, game.ImageName);
                    GameDto dto = _mapper.Map<GameDto>(game, opt =>
                    {
                        opt.Items["ImagePath"] = imagePath;
                    });
                    result.Add(dto);
                }
                PagedResponse<GameDto> res = new PagedResponse<GameDto>(response.PageNumber, response.PageSize, response.NextPage, response.PreviousPage, response.NumberOfPages);
                res.Data = result;
                return Ok(res);
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
                string imagePath = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, game.ImageName);
                GameDto dto = _mapper.Map<GameDto>(game, opt =>
                {
                    opt.Items["ImagePath"] = imagePath;
                });
                return Ok(dto);
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
        public async Task<IActionResult> AddGame([FromForm] GameCreationDto game)
        {
            try
            {
                game.ImageName = await SaveImage(game.ImageFile);
                Game g = _mapper.Map<Game>(game);
                g = _gamesServices.AddGame(g);
                return CreatedAtRoute("GetGame", new { id = g.Id }, g);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)).Replace(' ','-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName; 
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteGame(string id)
        {
            try
            {
                Game game = _gamesServices.GetGame(id);
                if(game == null)
                {
                    return NotFound("Game with id not found");

                }
                DeleteImage(game.ImageName);
                _gamesServices.DeleteGame(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Worker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateGame(string id, [FromForm]GameUpdateDto game)
        {
            try
            {
                if(game.ImageFile != null)
                {
                    DeleteImage(game.ImageName);
                    game.ImageName = await SaveImage(game.ImageFile);
                }
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

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
