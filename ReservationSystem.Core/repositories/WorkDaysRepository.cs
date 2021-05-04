using MongoDB.Driver;
using ReservationSystem.Core.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.repositories
{
    public class WorkDaysRepository : IWorkDaysRepository
    {
        private readonly IMongoCollection<WorkDay> _workDays;

        public WorkDaysRepository(IDBClient dbClient)
        {
            _workDays = dbClient.GetWorkDaysCollection();
        }
        public WorkDay AddWorkDay(WorkDay workDay)
        {
            _workDays.InsertOne(workDay);
            return workDay;
        }

        public void DeleteWorkDay(string id)
        {
            _workDays.DeleteOne(w => w.Id == id);
        }

        public WorkDay GetWorkDay(string id)
        {
            Console.WriteLine(id);
            return _workDays.Find(w => w.Id == id).FirstOrDefault();
        }

        public WorkDay GetWorkDayByDate(DateTime date)
        {
            return _workDays.Find(w => w.Date == date).FirstOrDefault();
        }

        public List<WorkDay> GetWorkDays()
        {
            return _workDays.Find(w => true).ToList();

        }

        public WorkDay UpdateWorkDay(WorkDay workDay)
        {
            GetWorkDay(workDay.Id);
            _workDays.ReplaceOne(w => w.Id == workDay.Id, workDay);
            return workDay;
        }
    }
}
