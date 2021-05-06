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
    public class AccountsService: IAccountsService
    {
        //TODO: account doesnt exist for getById, delete and update

        private readonly IAccountsRepository _accountsRepository;

        public AccountsService(IAccountsRepository accountsRepository)
        {
            _accountsRepository = accountsRepository;
        }

        public ClientAccount AddClientAccount(ClientAccount clientAccount)
        {
            ClientAccount c = _accountsRepository.AddClientAccount(clientAccount);
            return c;
        }

        public WorkerAccount AddWorkerAccount(WorkerAccount workerAccount)
        {
            _accountsRepository.AddWorkerAccount(workerAccount);
            return workerAccount;
        }

        public void DeleteClientAccount(string id)
        {
            _accountsRepository.DeleteClientAccount(id);

        }

        public void DeleteWorkerAccount(string id)
        {
            _accountsRepository.DeleteWorkerAccount(id);
        }

        public ClientAccount GetClientAccount(string id)
        {
            return _accountsRepository.GetClientAccount(id);
        }

        public ClientAccount GetClientAccountByEmail(string email)
        {
            return _accountsRepository.GetClientAccountByEmail(email);
        }

        public ClientAccount GetClientAccountByUsername(string username)
        {
            return _accountsRepository.GetClientAccountByUsername(username);
        }

        public List<ClientAccount> GetClientAccounts()
        {
            return _accountsRepository.GetClientAccounts();
        }

        public WorkerAccount GetWorkerAccount(string id)
        {
            return _accountsRepository.GetWorkerAccount(id);

        }

        public WorkerAccount GetWorkerAccountByEmail(string email)
        {
            return _accountsRepository.GetWorkerAccountByEmail(email);

        }

        public WorkerAccount GetWorkerAccountByUsername(string username)
        {
            return _accountsRepository.GetWorkerAccountByUsername(username);
        }

        public List<WorkerAccount> GetWorkerAccounts()
        {
            return _accountsRepository.GetWorkerAccounts();

        }

        public ClientAccount UpdateClientAccount(ClientAccount clientAccount)
        {
            //_accountsRepository.GetClientAccount(clientAccount.Id);
            var c =_accountsRepository.UpdateClientAccount(clientAccount);
            return c;
        }

        public WorkerAccount UpdateWorkerAccount(WorkerAccount workerAccount)
        {
            _accountsRepository.GetWorkerAccount(workerAccount.Id);
            var w = _accountsRepository.UpdateWorkerAccount(workerAccount);
            return w;
        }
    }
}
