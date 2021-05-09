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

        public bool DeleteTable(string id)
        {
            if(_tablesRepository.GetTable(id) == null)
            {
                return false;
            }
            return _tablesRepository.DeleteTable(id) > 0;
        }

        public Table GetTable(string id)
        {
            return _tablesRepository.GetTable(id);
        }

        public List<Table> GetTables()
        {
            return _tablesRepository.GetTables();
        }

        public bool UpdateTable(Table table)
        {
            if (_tablesRepository.GetTable(table.Id) == null){
                return false;
            }
            return _tablesRepository.UpdateTable(table);
        }
    }
}
