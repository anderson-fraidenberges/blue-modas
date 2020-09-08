using System.Collections.Generic;
using Api.Models;
using Api.Repositories.Contracts;
using MongoDB.Driver;

namespace Api.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {        
        public ProductRepository():base("Product")        {
            
        }

        public Product Get(string id)
        {
            return Repo.Find(f=> f.Id == id).FirstOrDefault();
        }

        public virtual List<Product> List() => Repo.Find(product => true).ToList();       

    }

}