using MongoDB.Driver;
using ReservationSystem.Core.contracts;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Core.repositories
{
    public class GamesRepository : IGamesRepository
    {
        private readonly IMongoCollection<Game> _games;
        public GamesRepository(IDBClient dbClient)
        {
            _games = dbClient.GetGamesCollection();
        }

        public Game AddGame(Game game)
        {
            _games.InsertOne(game);
            return game;
        }

        public int DeleteGame(string id)
        {
            DeleteResult result = _games.DeleteOne(game => game.Id == id);
            return (int)result.DeletedCount;
        }

        public Game GetGame(string id)
        {
            return _games.Find(game => game.Id == id).FirstOrDefault();
        }

        public List<Game> GetGames()
        {
            return _games.Find(w => true).ToList();
        }

        public bool UpdateGame(Game game)
        {
            ReplaceOneResult result =_games.ReplaceOne(g => g.Id == game.Id, game);
            return result.MatchedCount > 0;
        }

        public IMongoCollection<Game> GetGamesCollection()
        {
            return _games;
        }
    }
}
