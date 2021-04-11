using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
   public interface IWorksDaysService
    {
        List<WorkDay> GetWorkDays();
        WorkDay AddWorkDay(WorkDay workDay);
        WorkDay GetWorkDay(string id);
        void DeleteWorkDay(string id);
        WorkDay UpdateWorkDay(WorkDay workDay);
    }
}
