using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class Order
    {   
        public Order()
        {
            OrderDate = DateTime.Now.ToShortDateString();
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]   
        public string Id { get; set; }
        public string OrderDate { get; private set; }
        
        public string Name { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public int TotalQuantity { get; set; }

        public decimal TotalOrder { get; set; }

        public List<OrderProduct> Products { get; set; }

    }
}