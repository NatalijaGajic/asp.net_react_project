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
    public class SystemRolesService : ISystemRolesService
    {
        private readonly ISystemRolesRepository _systemRolesRepository;

        public SystemRolesService(ISystemRolesRepository systemRolesRepositor)
        {
            _systemRolesRepository = systemRolesRepositor;
        }
        public SystemRole AddSystemRole(SystemRole role)
        {
            _systemRolesRepository.AddSystemRole(role);
            return role;
        }

        public void DeleteSystemRole(string id)
        {
            _systemRolesRepository.DeleteSystemRole(id);
        }

        public SystemRole GetSystemRole(string id)
        {
            return _systemRolesRepository.GetSystemRole(id);
        }

        public List<SystemRole> GetSystemRoles()
        {
            return _systemRolesRepository.GetSystemRoles();
        }

        public SystemRole UpdateSystemRole(SystemRole role)
        {
            _systemRolesRepository.GetSystemRole(role.Id);
            _systemRolesRepository.UpdateSystemRole(role);
            return role;
        }
    }
}
