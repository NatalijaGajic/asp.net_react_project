using MongoDB.Driver;
using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class TablesService : ITablesService
    {
        private readonly ITablesRepository _tablesRepository;
        public TablesService(ITablesRepository tablesRepository)
        {
            _tablesRepository = tablesRepository;
        }
        public Table AddTable(Table table)
        {
            _tablesRepository.AddTable(table);
            return table;
        }

        public void DeleteTable(string id)
        {
            _tablesRepository.DeleteTable(id);
        }

        public Table GetTable(string id)
        {
            return _tablesRepository.GetTable(id);
        }

        public List<Table> GetTables()
        {
            return _tablesRepository.GetTables();
        }

        public Table UpdateTable(Table table)
        {
            _tablesRepository.GetTable(table.Id);
            _tablesRepository.UpdateTable(table);
            return table;
        }
    }
}
