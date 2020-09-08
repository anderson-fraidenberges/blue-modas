using Api.Models;
using Api.Repositories.Contracts;
using MongoDB.Driver;

namespace Api.Repositories
{
    public class ApplicationAccessControlRepository : BaseRepository<ApplicationAccessControl>, IApplicationAccessControlRepository
    {
        public ApplicationAccessControlRepository():base("ApplicationAccessControl")
        {
            
        }
        
        public ApplicationAccessControl Get(string token) => Repo.Find(ctr => ctr.Token == token && ctr.Active).FirstOrDefault();

    }
}
