using System.Collections.Generic;
using Api.Models;
using Api.Repositories.Contracts;


namespace Api.Services
{
    public class OrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public Order Get(string id) => _orderRepository.Get(id);

        public string Create(Order order)
        {
            return _orderRepository.Create(order);
        }
    }
}