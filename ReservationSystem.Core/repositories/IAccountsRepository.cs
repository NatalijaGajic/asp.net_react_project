using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public interface IAccountsRepository
    {
        List<WorkerAccount> GetWorkerAccounts();
        WorkerAccount AddWorkerAccount(WorkerAccount workerAccount);
        WorkerAccount GetWorkerAccount(string id);
        void DeleteWorkerAccount(string id);
        WorkerAccount UpdateWorkerAccount(WorkerAccount workerAccount);
        List<ClientAccount> GetClientAccounts();
        ClientAccount AddClientAccount(ClientAccount clientAccount);
        ClientAccount GetClientAccount(string id);
        void DeleteClientAccount(string id);
        ClientAccount UpdateClientAccount(ClientAccount clientAccount);
        ClientAccount GetClientAccountByUsername(string username);
        ClientAccount GetClientAccountByEmail(string email);
        WorkerAccount GetWorkerAccountByUsername(string username);
        WorkerAccount GetWorkerAccountByEmail(string email);
    }
}
