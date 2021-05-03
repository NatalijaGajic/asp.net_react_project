using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public interface IGamesRepository
    {
        List<Game> GetGames();
        Game AddGame(Game game);
        Game GetGame(string id);
        void DeleteGame(string id);
        Game UpdateGame(Game game);
    }
}
