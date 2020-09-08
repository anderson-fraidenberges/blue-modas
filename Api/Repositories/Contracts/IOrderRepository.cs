using System.Collections.Generic;
using Api.Models;

namespace Api.Repositories.Contracts
{
    public interface IOrderRepository
    {
        string Create(Order order);
        Order Get(string id);
    }
}