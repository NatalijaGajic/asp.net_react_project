using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;

namespace ReservationSystem.Core
{
    public class DBClient : IDBClient
    {
        private readonly IMongoCollection<Game> _games;
        public DBClient(IOptions<ReservationSystemDBConfig> reservationSystemDbConfing)
        {
            var client = new MongoClient(reservationSystemDbConfing.Value.Connection_String);
            var database = client.GetDatabase(reservationSystemDbConfing.Value.Database_Name);
            _games = database.GetCollection<Game>(reservationSystemDbConfing.Value.Games_Collection_Name);
        }
        public IMongoCollection<Game> GetGamesCollection()
        {
            return _games;
        }
    }
}
