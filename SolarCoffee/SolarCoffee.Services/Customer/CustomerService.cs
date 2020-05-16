using System;
using System.Collections.Generic;
using System.Text;
using SolarCoffee.Data;

namespace SolarCoffee.Services.Customer
{
    public class CustomerService : ICustomerService
    {

        private readonly SolarDbContext _db;

        public CustomerService


        public ServiceResponse<Data.Models.Customer> CreateCustomer(Data.Models.Customer customer)
        {
            throw new NotImplementedException();
        }

        public ServiceResponse<bool> DeleteCustomer(int id)
        {
            throw new NotImplementedException();
        }

        public List<Data.Models.Customer> GetAllCustomers()
        {
            throw new NotImplementedException();
        }

        public Data.Models.Customer GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
