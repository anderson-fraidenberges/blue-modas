using Api.Shared;
using MongoDB.Driver;

namespace Api.Repositories
{
    public class BaseRepository<TCollection> where TCollection : class
    {
        protected readonly IMongoCollection<TCollection> Repo;
        public BaseRepository(string collectionName)
        {
            var client = new MongoClient(Config.ConnectionString);
            var database = client.GetDatabase(Config.DatabaseName);
            Repo = database.GetCollection<TCollection>(collectionName);
        }        
    }
}