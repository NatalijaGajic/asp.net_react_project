using ReservationSystem.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.Services
{
    public interface IAuthService
    {
        AuthenticationResult Login(string email, string password);
    }
}
