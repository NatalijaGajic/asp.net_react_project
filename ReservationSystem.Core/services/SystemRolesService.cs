using AutoMapper;
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
        private readonly IMapper _mapper;


        public SystemRolesService(ISystemRolesRepository systemRolesRepositor, IMapper mapper)
        {
            _systemRolesRepository = systemRolesRepositor;
            _mapper = mapper;
        }
        public SystemRole AddSystemRole(SystemRole role)
        {
            SystemRole result =_systemRolesRepository.AddSystemRole(role);
            return result;
        }

        public bool DeleteSystemRole(string id)
        {
            if (_systemRolesRepository.GetSystemRole(id) == null)
            {
                return false;
            }
            return _systemRolesRepository.DeleteSystemRole(id) > 0;
        }

        public SystemRole GetSystemRole(string id)
        {
            return _systemRolesRepository.GetSystemRole(id);
        }

        public List<SystemRole> GetSystemRoles()
        {
            return _systemRolesRepository.GetSystemRoles();
        }

        public bool UpdateSystemRole(SystemRole role)
        {
            if (_systemRolesRepository.GetSystemRole(role.Id) == null)
            {
                return false;
            }
            return _systemRolesRepository.UpdateSystemRole(role);
        }
    }
}
