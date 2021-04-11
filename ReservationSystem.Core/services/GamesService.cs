using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Core
{
    public class GamesServices : IGamesServices
    {
        private readonly IMongoCollection<Game> _games;
        public GamesServices(IDBClient dbClient)
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
            //TODO Sequence contains no elements' when id does not exist
            //Throw exception
            return _games.Find(game => game.Id == id).First();
        }

        public List<Game> GetGames()
        {
            return _games.Find(game => true).ToList();
        }

        public Game UpdateGame(Game game)
        {
            GetGame(game.Id);
            _games.ReplaceOne(g => g.Id == game.Id, game);
            return game;
        }
    }
}
