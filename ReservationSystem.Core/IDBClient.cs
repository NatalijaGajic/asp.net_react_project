using MongoDB.Driver;
using ReservationSystem.Core.models;
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
        IMongoCollection<WorkDay> GetWorkDaysCollection();
        IMongoCollection<Reservation> GetReservationsCollection();

        IMongoCollection<WorkerAccount> GetWorkerAccountsCollection();
        IMongoCollection<ClientAccount> GetClientAccountsCollection();
        IMongoCollection<IntervalsForWorkDay> GetIntervalsForWorkDaysCollection();
        IMongoCollection<Table> GetTablesCollection();
        IMongoCollection<SystemRole> GetSytemRolesCollection();
        IMongoCollection<Payment> GetPaymentsCollection();



    }
}
