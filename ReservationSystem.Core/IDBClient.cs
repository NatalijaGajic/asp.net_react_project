using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core
{
    public interface IDBClient
    {
        IMongoCollection<Game> GetGamesCollection();
    }
}
