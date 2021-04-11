﻿using ReservationSystem.Core.models;
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
        void DeleteSystemRole(string id);
        SystemRole UpdateSystemRole(SystemRole role);
    }
}
