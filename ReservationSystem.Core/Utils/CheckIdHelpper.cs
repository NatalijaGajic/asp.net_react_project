using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ReservationSystem.Core.Utils
{
    public static class CheckIdHelpper
    {
        public static bool CheckId(string id) {
            var checkForHexRegExp = new Regex("^[0-9a-fA-F]{24}$");
            return checkForHexRegExp.IsMatch(id);
           
        }
    }
}
