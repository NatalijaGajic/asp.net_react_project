using MongoDB.Driver;
using ReservationSystem.Core.contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public interface IGamesRepository
    {
        public List<Game> GetGames();
        Game AddGame(Game game);
        Game GetGame(string id);
        int DeleteGame(string id);
        bool UpdateGame(Game game);
        IMongoCollection<Game> GetGamesCollection();
    }
}
