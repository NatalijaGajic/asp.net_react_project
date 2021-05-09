using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public interface ISystemRolesService
    {
        List<SystemRole> GetSystemRoles();
        SystemRole AddSystemRole(SystemRole role);
        SystemRole GetSystemRole(string id);
        bool DeleteSystemRole(string id);
        bool UpdateSystemRole(SystemRole role);
    }
}
