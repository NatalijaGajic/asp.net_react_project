using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Security.Claims;

namespace ReservationSystem.Extensions
{
    public static class GeneralExtensions
    {
        public static string GetUserId(this HttpContext httpContext)
        {
             
             if(httpContext.User == null)
            {
                return string.Empty;
            }
            return httpContext.User.Claims.Single(x => x.Type == "id").Value;
        }

        public static string GetUserRole(this HttpContext httpContext)
        {

            if (httpContext.User == null)
            {
                return string.Empty;
            }
            return httpContext.User.Claims.Single(x => x.Type == ClaimTypes.Role).Value;
        }
    }
}
