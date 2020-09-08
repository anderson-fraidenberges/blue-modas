
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Api.Models
{
    public class ApplicationAccessControl
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }        
        
        public string Name { get; set; }
        
        public string Token { get; set; }
        
        public bool Active { get; set; }

    }
}