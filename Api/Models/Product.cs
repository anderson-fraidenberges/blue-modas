using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class Product    
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        
        public string Name { get; set; }

        
        public decimal Price { get; set; }       

        
        public string Image { get;set; } 
    }
}