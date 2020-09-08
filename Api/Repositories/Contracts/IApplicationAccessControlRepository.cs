using Api.Models;

namespace Api.Repositories.Contracts
{
    public interface IApplicationAccessControlRepository
    {
        ApplicationAccessControl Get(string token);
    }
}