using MongoDB.Driver;
using ReservationSystem.Core.repositories;
using System;
using System.Collections.Generic;

namespace ReservationSystem.Core
{
    public class GamesService : IGamesService
    {
        private readonly IGamesRepository _gamesRepository;
        public GamesService(IGamesRepository gamesRepostiory)
        {
            _gamesRepository = gamesRepostiory;
        }

        public Game AddGame(Game game)
        {
            _gamesRepository.AddGame(game);
            return game;
        }

        public void DeleteGame(string id)
        {
            _gamesRepository.DeleteGame(id);
        }

        public Game GetGame(string id)
        {
            return _gamesRepository.GetGame(id);
        }

        public List<Game> GetGames()
        {
            return _gamesRepository.GetGames();
        }

        public Game UpdateGame(Game game)
        {
            _gamesRepository.GetGame(game.Id);
            _gamesRepository.UpdateGame(game);
            return game;
        }
    }
}
