using MongoDB.Driver;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.dtos;
using ReservationSystem.Core.exceptions;
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
            Game g = _gamesRepository.AddGame(game);
            return g;
        }

        public bool DeleteGame(string id)
        {
            return _gamesRepository.DeleteGame(id) > 0;
        }

        public PagedResponse<Game> GetAllGames(PaginationQuery paginationQuery)
        {
            IMongoCollection<Game> _games = _gamesRepository.GetGamesCollection();
            SortDefinition<Game> sort = Builders<Game>.Sort.Ascending("Name");
            FilterDefinition<Game> filter = Builders<Game>.Filter.Where(game => game.IsActive == true);

            var take = paginationQuery.PageSize > 100 ? 100 : paginationQuery.PageSize;
            var skip = (paginationQuery.PageNumber - 1) * take;
            if (take < 0 || skip < 0)
            {
                throw new InvalidGamesQueryParamsException("Query parameters PageSize and PageNumber should be a positive integer");
            }
            List<Game> games = _games.Find(filter).Sort(sort).Skip(skip).Limit(take).ToList();
            int numberOfGames = GetNumberOfActiveGames();
            return new PagedResponse<Game>(games, paginationQuery, numberOfGames);
        }

        public Game GetGame(string id)
        {
            return _gamesRepository.GetGame(id);
        }

        public PagedResponse<Game> GetGames(PaginationQuery paginationQuery, GamesQueryParams gamesQueryParams)
        {
            IMongoCollection<Game> _games = _gamesRepository.GetGamesCollection();
            FilterDefinition<Game> filter = Builders<Game>.Filter.Where(game => true);
            SortDefinition<Game> sort = Builders<Game>.Sort.Ascending("Name");

            if (gamesQueryParams != null)
            {
                filter = Builders<Game>.Filter.Where(game => game.IsActive == gamesQueryParams.IsActive);

                if (gamesQueryParams.NumberOfPeople != 0)
                {
                    int number = gamesQueryParams.NumberOfPeople;
                    if (number < 0)
                    {
                        throw new InvalidGamesQueryParamsException("Query parameter NumberOfPeople should be a positive integer");
                    }
                    filter = Builders<Game>.Filter.And(filter, 
                        Builders<Game>.Filter.Where(game => game.NumberOfPlayers >= number));
                }
                if(gamesQueryParams.SearchByName != null)
                {
                    var queryString = gamesQueryParams.SearchByName.ToLower();
                    filter = Builders<Game>.Filter.And(filter, 
                        Builders<Game>.Filter.Where(game => game.Name.ToLower().Contains(queryString)));
                }
            }
            if (gamesQueryParams != null && gamesQueryParams.OrderBy != null)
            {
                //doesn't cause error if value doesnt match any property
                sort = Builders<Game>.Sort.Ascending(gamesQueryParams.OrderBy);
            }
            if (paginationQuery != null)
            {
                //TODO: If page size smaller than 0 or page number smaller than 0 (if they are not integers fluent validator catches)
                
                var take = paginationQuery.PageSize > 100? 100:paginationQuery.PageSize;
                var skip = (paginationQuery.PageNumber - 1) * take;
                if (take < 0 || skip < 0)
                {
                    throw new InvalidGamesQueryParamsException("Query parameters PageSize and PageNumber should be a positive integer");
                }
                int numOfGames = (int)_games.Find(filter).CountDocuments();
                List<Game> gamesList = _games.Find(filter).Sort(sort).Skip(skip).Limit(take).ToList();
                return new PagedResponse<Game>(gamesList, paginationQuery, numOfGames);
            }
            int numberOfGames = (int)_games.Find(filter).CountDocuments();
            List<Game> games = _games.Find(filter).Sort(sort).ToList();
            return new PagedResponse<Game>(games, numberOfGames);
        }

        public bool UpdateGame(Game game)
        {
            Game g = _gamesRepository.GetGame(game.Id);
            if (g == null)
            {
                return false;
            }
            return _gamesRepository.UpdateGame(game); 
        }

        public int GetNumberOfActiveGames()
        {
            return _gamesRepository.GetNumberOfActiveGames();
        }

        public List<Game> GetAllGames()
        {
            return _gamesRepository.GetAllGames();
        }
    }
}
