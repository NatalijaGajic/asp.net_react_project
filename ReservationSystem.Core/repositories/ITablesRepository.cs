using ReservationSystem.Core.models;
using System.Collections.Generic;

namespace ReservationSystem.Core.repositories
{
    public interface ITablesRepository
    {
        List<Table> GetTables();
        Table AddTable(Table table);
        Table GetTable(string id);
        int DeleteTable(string id);
        bool UpdateTable(Table table);
    }
}
