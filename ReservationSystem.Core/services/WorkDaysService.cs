using MongoDB.Driver;
using ReservationSystem.Core.contracts;
using ReservationSystem.Core.models;
using ReservationSystem.Core.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReservationSystem.Core.services
{
    public class WorkDaysService : IWorkDaysService
    {
        private readonly IWorkDaysRepository _worksDaysRepository;

        public WorkDaysService(IWorkDaysRepository worksDaysRepository)
        {
            _worksDaysRepository = worksDaysRepository;
        }
        public WorkDay AddWorkDay(WorkDay workDay)
        {
            _worksDaysRepository.AddWorkDay(workDay);
            return workDay;
        }

        public bool DeleteWorkDay(string id)
        {
            if(_worksDaysRepository.GetWorkDay(id) == null)
            {
                return false;
            }
            return _worksDaysRepository.DeleteWorkDay(id) > 0;
        }

        public WorkDay GetWorkDay(string id)
        {
            return _worksDaysRepository.GetWorkDay(id);
        }

        public WorkDay GetWorkDayByDate(WorkDaysQueryParams queryParams) 
        {
            string date = queryParams.Date.Trim();
            if (date.Length > 8)
            {
                string[] dateSplits;
                dateSplits = date.Split("-");
                if (dateSplits.Length == 3)
                {
                    try
                    {
                        DateTime dateTime = new DateTime(Convert.ToInt32(dateSplits[0]), Convert.ToInt32(dateSplits[1]), Convert.ToInt32(dateSplits[2]));
                        return _worksDaysRepository.GetWorkDayByDate(dateTime);
                        //TODO: conversion and bad date errors
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
                else
                {
                    //TODO: Custom exceptions
                    //Bad spliting custom exception
                    throw new System.Exception("Wrong date format should be yyyy-MM-dd");
                }
            }
            else
            {
                //Bad query param custom exception
                throw new System.Exception();
            }
        }

        public List<WorkDay> GetWorkDays()
        {
            return _worksDaysRepository.GetWorkDays();

        }

        public bool UpdateWorkDay(WorkDay workDay)
        {
            //TODO: map date because updatedto doesnt have date
            if(_worksDaysRepository.GetWorkDay(workDay.Id) == null)
            {
                return false;
            }
            return _worksDaysRepository.UpdateWorkDay(workDay);
        }
    }
}
