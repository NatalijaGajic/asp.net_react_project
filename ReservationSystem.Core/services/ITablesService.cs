using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public interface ITablesService
    {
        List<Table> GetTables();
        Table AddTable(Table table);
        Table GetTable(string id);
        void DeleteTable(string id);
        Table UpdateTable(Table table);
    }
}
