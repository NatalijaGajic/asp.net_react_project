using MongoDB.Driver;
using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System;
using System.Collections.Generic;
using ReservationSystem.Core.Utils;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class AccountsService: IAccountsService
    {
        //TODO: account doesnt exist for getById, delete and update

        private readonly IAccountsRepository _accountsRepository;
        private readonly ISystemRolesRepository _systemRolesRepository;

        public AccountsService(IAccountsRepository accountsRepository, ISystemRolesRepository systemRolesRepository)
        {
            _accountsRepository = accountsRepository;
            _systemRolesRepository = systemRolesRepository;
        }

        public ClientAccount AddClientAccount(ClientAccount clientAccount)
        {
            string roleName = "Client";
            SystemRole role = _systemRolesRepository.GetSystemRoleByName(roleName);
            clientAccount.Role = role;
            clientAccount.AccountType = "Client";
            ClientAccount c = _accountsRepository.AddClientAccount(clientAccount);
            return c;
        }

        public WorkerAccount AddWorkerAccount(WorkerAccount workerAccount)
        {
            _accountsRepository.AddWorkerAccount(workerAccount);
            return workerAccount;
        }

        public bool DeleteClientAccount(string id)
        {
            return _accountsRepository.DeleteClientAccount(id) > 0;

        }

        public bool DeleteWorkerAccount(string id)
        {
            return _accountsRepository.DeleteWorkerAccount(id) > 0;
        }

        public ClientAccount GetClientAccount(string id)
        {
            if (!CheckIdHelpper.CheckId(id))
            {
                throw new InvalidCastException("Id is not a valid 24 digit hex string");
            }
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

        public bool UpdateClientAccount(ClientAccount clientAccount)
        {
            ClientAccount client = _accountsRepository.GetClientAccount(clientAccount.Id);
            if(client == null)
            {
                return false;
            }
            setUpdatedClientAccountFields(client, clientAccount);
            return _accountsRepository.UpdateClientAccount(client);
        }

        public bool UpdateWorkerAccount(WorkerAccount workerAccount)
        {
            _accountsRepository.GetWorkerAccount(workerAccount.Id);
            return _accountsRepository.UpdateWorkerAccount(workerAccount);
        }

        private void setUpdatedClientAccountFields(ClientAccount client, ClientAccount clientAccount)
        {
            client.Username = clientAccount.Username;
            client.FirstName = clientAccount.FirstName;
            client.LastName = clientAccount.LastName;
            client.Telephone = clientAccount.Telephone;
        }
    }
}
