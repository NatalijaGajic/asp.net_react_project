using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;

namespace ReservationSystem.Core
{
    public class DBClient : IDBClient
    {
        private readonly IMongoCollection<Game> _games;
        private readonly IMongoCollection<WorkerAccount> _workers;
        private readonly IMongoCollection<ClientAccount> _clients;
        private readonly IMongoCollection<WorkDay> _workDays;
        private readonly IMongoCollection<IntervalsForWorkDay> _intervalsForWorkDays;
        private readonly IMongoCollection<Reservation> _reservations;
        private readonly IMongoCollection<Table> _tables;
        private readonly IMongoCollection<Payment> _payments;
        private readonly IMongoCollection<SystemRole> _systemRoles;





        public DBClient(IOptions<ReservationSystemDBConfig> reservationSystemDbConfing)
        {
            var client = new MongoClient(reservationSystemDbConfing.Value.Connection_String);
            var database = client.GetDatabase(reservationSystemDbConfing.Value.Database_Name);
            _games = database.GetCollection<Game>(reservationSystemDbConfing.Value.Games_Collection_Name);
            _workers = database.GetCollection<WorkerAccount>(reservationSystemDbConfing.Value.Workers_Collection_Name);
            _clients = database.GetCollection<ClientAccount>(reservationSystemDbConfing.Value.Clients_Collection_Name);
            _workDays = database.GetCollection<WorkDay>(reservationSystemDbConfing.Value.WorkDays_Collection_Name);
            _reservations = database.GetCollection<Reservation>(reservationSystemDbConfing.Value.Reservations_Collection_Name);
            _intervalsForWorkDays = database.GetCollection<IntervalsForWorkDay>(reservationSystemDbConfing.Value.IntervalsForWorkDays_Collection_Name);
            _tables = database.GetCollection<Table>(reservationSystemDbConfing.Value.Tables_Collection_Name);
            _systemRoles = database.GetCollection<SystemRole>(reservationSystemDbConfing.Value.SystemRoles_Collection_Name);
            _payments = database.GetCollection<Payment>(reservationSystemDbConfing.Value.Payments_Collection_Name);

        }

        public IMongoCollection<ClientAccount> GetClientAccountsCollection()
        {
            return _clients;
        }

        public IMongoCollection<Game> GetGamesCollection()
        {
            return _games;
        }

        public IMongoCollection<IntervalsForWorkDay> GetIntervalsForWorkDays()
        {
            return _intervalsForWorkDays;
        }

        public IMongoCollection<IntervalsForWorkDay> GetIntervalsForWorkDaysCollection()
        {
            return _intervalsForWorkDays;
        }

        public IMongoCollection<Payment> GetPaymentsCollection()
        {
            return _payments;
        }

        public IMongoCollection<Reservation> GetReservationsCollection()
        {
            return _reservations;
        }

        public IMongoCollection<SystemRole> GetSytemRolesCollection()
        {
            return _systemRoles;
        }

        public IMongoCollection<Table> GetTablesCollection()
        {
            return _tables;
        }

        public IMongoCollection<WorkDay> GetWorkDaysCollection()
        {
            return _workDays;
        }

        public IMongoCollection<WorkerAccount> GetWorkerAccountsCollection()
        {
            return _workers;
        }
    }
}
