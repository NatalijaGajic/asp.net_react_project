using ReservationSystem.Core.contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core
{
    public interface IGamesService
    {
        List<Game> GetGames(PaginationQuery paginationQuery, GamesQueryParams gamesQueryParams);
        Game AddGame(Game game);
        Game GetGame(string id);
        bool DeleteGame(string id);
        bool UpdateGame(Game game);
    }
}
