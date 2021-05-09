using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class AccountsRepository: IAccountsRepository
    {
        private readonly IMongoCollection<WorkerAccount> _workers;
        private readonly IMongoCollection<ClientAccount> _clients;

        public AccountsRepository(IDBClient dbClient)
        {
            _workers = dbClient.GetWorkerAccountsCollection();
            _clients = dbClient.GetClientAccountsCollection();
        }

        public ClientAccount AddClientAccount(ClientAccount clientAccount)
        {
            _clients.InsertOne(clientAccount);
            return clientAccount;
        }

        public WorkerAccount AddWorkerAccount(WorkerAccount workerAccount)
        {
            _workers.InsertOne(workerAccount);
            return workerAccount;
        }

        public int DeleteClientAccount(string id)
        {
            DeleteResult result = _clients.DeleteOne(client => client.Id == id);
            return (int)result.DeletedCount;

        }

        public int DeleteWorkerAccount(string id)
        {
            DeleteResult result = _workers.DeleteOne(w => w.Id == id);
            return (int)result.DeletedCount;

        }

        public ClientAccount GetClientAccount(string id)
        {
            return _clients.Find(c => c.Id == id).FirstOrDefault();
        }

        public ClientAccount GetClientAccountByEmail(string email)
        {
            return _clients.Find(w => w.Email.Equals(email)).FirstOrDefault();
        }

        public ClientAccount GetClientAccountByUsername(string username)
        {
            return _clients.Find(c => c.Username.Equals(username)).FirstOrDefault();
        }

        public List<ClientAccount> GetClientAccounts()
        {
            return _clients.Find(client => true).ToList();
        }

        public WorkerAccount GetWorkerAccount(string id)
        {
            return _workers.Find(w => w.Id == id).FirstOrDefault();

        }

        public WorkerAccount GetWorkerAccountByEmail(string email)
        {
            return _workers.Find(w => w.Email.Equals(email)).FirstOrDefault();
        }

        public WorkerAccount GetWorkerAccountByUsername(string username)
        {
            return _workers.Find(w => w.Username.Equals(username)).FirstOrDefault();

        }

        public List<WorkerAccount> GetWorkerAccounts()
        {
            return _workers.Find(worker => true).ToList();

        }

        public bool UpdateClientAccount(ClientAccount clientAccount)
        {
            ReplaceOneResult result = _clients.ReplaceOne(c => c.Id == clientAccount.Id, clientAccount);
            return (result.MatchedCount > 0);
        }

        public bool UpdateWorkerAccount(WorkerAccount workerAccount)
        {
            //TODO: its not returning from database workerAccount is from body
            ReplaceOneResult result = _workers.ReplaceOne(w => w.Id == workerAccount.Id, workerAccount);
            return (result.MatchedCount > 0);
        }
    }
}
