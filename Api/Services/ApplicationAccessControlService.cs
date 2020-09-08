using System.Collections.Generic;
using Api.Models;
using Api.Repositories;
using Api.Repositories.Contracts;
using MongoDB.Driver;

namespace Api.Services
{
    public class ApplicationAccessControlService
    {
        private readonly IApplicationAccessControlRepository _controlRepository;
        public ApplicationAccessControlService(IApplicationAccessControlRepository controlRepository)
        {
            _controlRepository = controlRepository;
        }

        public ApplicationAccessControl Get(string token)
        {
            return _controlRepository.Get(token);
        }
    }

}