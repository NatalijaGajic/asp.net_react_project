using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class SystemRolesRepository : ISystemRolesRepository
    {
        private readonly IMongoCollection<SystemRole> _systemRoles;

        public SystemRolesRepository(IDBClient dbClient)
        {
            _systemRoles = dbClient.GetSytemRolesCollection();
        }
        public SystemRole AddSystemRole(SystemRole role)
        {
            _systemRoles.InsertOne(role);
            return role;
        }

        public void DeleteSystemRole(string id)
        {
            _systemRoles.DeleteOne(r => r.Id == id);
        }

        public SystemRole GetSystemRole(string id)
        {
            return _systemRoles.Find(r => r.Id == id).FirstOrDefault();
        }

        public SystemRole GetSystemRoleByName(string roleName)
        {
            return _systemRoles.Find(r => r.Name.ToLower() == roleName.ToLower()).FirstOrDefault();
        }

        public List<SystemRole> GetSystemRoles()
        {
            return _systemRoles.Find(r => true).ToList();
        }

        public SystemRole UpdateSystemRole(SystemRole role)
        {
            _systemRoles.ReplaceOne(r => r.Id == role.Id, role);
            return role;
        }
    }
}
