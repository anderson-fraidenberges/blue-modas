using System.Collections.Generic;
using Api.Models;
using Api.Repositories.Contracts;
using MongoDB.Driver;

namespace Api.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public List<Product> List()
        {
            return _productRepository.List();
        }
    }
}