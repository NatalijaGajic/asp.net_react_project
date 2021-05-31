using ReservationSystem.Core.contracts;
using ReservationSystem.Core.dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core
{
    public interface IGamesService
    {
        PagedResponse<Game> GetGames(PaginationQuery paginationQuery, GamesQueryParams gamesQueryParams);
        Game AddGame(Game game);
        Game GetGame(string id);
        bool DeleteGame(string id);
        bool UpdateGame(Game game);

        int GetNumberOfActiveGames();
        PagedResponse<Game> GetAllGames(PaginationQuery paginationQuery);
        List<Game> GetAllGames();
    }
}
