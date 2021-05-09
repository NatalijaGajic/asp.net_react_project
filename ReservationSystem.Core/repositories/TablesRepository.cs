using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class TablesRepository : ITablesRepository
    {
        private readonly IMongoCollection<Table> _tables;
        public TablesRepository(IDBClient dbClient)
        {
            _tables = dbClient.GetTablesCollection();
        }
        public Table AddTable(Table table)
        {
            _tables.InsertOne(table);
            return table;
        }

        public int DeleteTable(string id)
        {
            DeleteResult result = _tables.DeleteOne(t => t.Id == id);
            return (int)result.DeletedCount;
        }

        public Table GetTable(string id)
        {
            return _tables.Find(t => t.Id == id).FirstOrDefault();
        }

        public List<Table> GetTables()
        {
            return _tables.Find(t => true).ToList();
        }

        public bool UpdateTable(Table table)
        {
            ReplaceOneResult result = _tables.ReplaceOne(t => t.Id == table.Id, table);
            return result.MatchedCount > 0;
        }
    }
}
