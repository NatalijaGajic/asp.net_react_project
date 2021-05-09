using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public interface ISystemRolesRepository
    {
        List<SystemRole> GetSystemRoles();
        SystemRole AddSystemRole(SystemRole role);
        SystemRole GetSystemRole(string id);
        int DeleteSystemRole(string id);
        bool UpdateSystemRole(SystemRole role);
        SystemRole GetSystemRoleByName(string roleName);
    }
}
