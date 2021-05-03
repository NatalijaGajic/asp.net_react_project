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
    public class WorkDaysService : IWorksDaysService
    {
        private readonly IWorksDaysRepository _worksDaysRepository;

        public WorkDaysService(IWorksDaysRepository worksDaysRepository)
        {
            _worksDaysRepository = worksDaysRepository;
        }
        public WorkDay AddWorkDay(WorkDay workDay)
        {
            _worksDaysRepository.AddWorkDay(workDay);
            return workDay;
        }

        public void DeleteWorkDay(string id)
        {
            _worksDaysRepository.DeleteWorkDay(id);
        }

        public WorkDay GetWorkDay(string id)
        {
            return _worksDaysRepository.GetWorkDay(id);
        }

        public List<WorkDay> GetWorkDays()
        {
            return _worksDaysRepository.GetWorkDays();

        }

        public WorkDay UpdateWorkDay(WorkDay workDay)
        {
            _worksDaysRepository.GetWorkDay(workDay.Id);
            _worksDaysRepository.UpdateWorkDay(workDay);
            return workDay;
        }
    }
}
