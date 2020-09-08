using System.Collections.Generic;
using Api.Models;

namespace Api.Repositories.Contracts
{
    public interface IProductRepository
    {
        List<Product> List();
        Product Get(string id);
    }

}