using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;
        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }
        
        [Authorize]
        public ActionResult<Order> Get([FromQuery]string id)
        {
            var order = _orderService.Get(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPost]
        [Authorize]
        [Route("Create")]
        public ActionResult<dynamic> Create([FromBody] Order order)
        {
            _orderService.Create(order);
            
            if (order.Id == null) {
                return NoContent();
            }

            return new { orderId = order.Id };
        }
    }
}