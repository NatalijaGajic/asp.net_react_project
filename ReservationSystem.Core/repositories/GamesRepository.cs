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

        public void DeleteGame(string id)
        {
            _games.DeleteOne(game => game.Id == id);
        }

        public Game GetGame(string id)
        {
            return _games.Find(game => game.Id == id).First();
        }

        public IMongoCollection<Game> GetGames()
        {
            return _games;
        }

        public Game UpdateGame(Game game)
        {
            _games.ReplaceOne(g => g.Id == game.Id, game);
            return game;
        }
    }
}
