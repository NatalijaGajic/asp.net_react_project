using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class TablesService : ITablesService
    {
        private readonly IMongoCollection<Table> _tables;
        public TablesService(IDBClient dbClient)
        {
            _tables = dbClient.GetTablesCollection();
        }
        public Table AddTable(Table table)
        {
            _tables.InsertOne(table);
            return table;
        }

        public void DeleteTable(string id)
        {
            _tables.DeleteOne(t => t.Id == id);
        }

        public Table GetTable(string id)
        {
            return _tables.Find(t => t.Id == id).First();
        }

        public List<Table> GetTables()
        {
            return _tables.Find(t => true).ToList();
        }

        public Table UpdateTable(Table table)
        {
            GetTable(table.Id);
            _tables.ReplaceOne(t => t.Id == table.Id, table);
            return table;
        }
    }
}
