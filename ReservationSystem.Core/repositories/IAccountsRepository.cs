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
        int DeleteWorkerAccount(string id);
        bool UpdateWorkerAccount(WorkerAccount workerAccount);
        List<ClientAccount> GetClientAccounts();
        ClientAccount AddClientAccount(ClientAccount clientAccount);
        ClientAccount GetClientAccount(string id);
        int DeleteClientAccount(string id);
        bool UpdateClientAccount(ClientAccount clientAccount);
        ClientAccount GetClientAccountByUsername(string username);
        ClientAccount GetClientAccountByEmail(string email);
        WorkerAccount GetWorkerAccountByUsername(string username);
        WorkerAccount GetWorkerAccountByEmail(string email);
    }
}
