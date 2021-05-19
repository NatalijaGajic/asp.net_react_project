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

        public int DeleteWorkDay(string id)
        {
           DeleteResult result = _workDays.DeleteOne(w => w.Id == id);
            return (int)result.DeletedCount;
        }

        public WorkDay GetWorkDay(string id)
        {
            return _workDays.Find(w => w.Id == id).FirstOrDefault();
        }

        public WorkDay GetWorkDayByDate(DateTime date)
        {
            var filterBuilder = Builders<WorkDay>.Filter;
            var filter = filterBuilder.Where(x => x.Date.Equals(date));
            return _workDays.Find(filter).FirstOrDefault();
        }

        public List<WorkDay> GetWorkDays()
        {
            return _workDays.Find(w => true).ToList();

        }

        public bool UpdateWorkDay(WorkDay workDay)
        {
            ReplaceOneResult result = _workDays.ReplaceOne(w => w.Id == workDay.Id, workDay);
            return result.MatchedCount > 0;
        }
    }
}
