using ReservationSystem.Core.models;
using System.Collections.Generic;

namespace ReservationSystem.Core.repositories
{
    public interface ITablesRepository
    {
        List<Table> GetTables();
        Table AddTable(Table table);
        Table GetTable(string id);
        void DeleteTable(string id);
        Table UpdateTable(Table table);
    }
}
