using System.Collections.Generic;
using Api.Models;
using Api.Repositories.Contracts;
using MongoDB.Driver;

namespace Api.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly IProductRepository _productRepository;
        public OrderRepository(IProductRepository productRepository) : base("Order")
        {
            _productRepository = productRepository;
        }

        ///Recalcula os totais com os valores do produto cadastrado, evitando manipulação de valores via front-end
        private void ValidatePrices(Order order)
        {
            try
            {
                order.Products.ForEach(productFromFront =>
                {
                    var productFromBase = _productRepository.Get(productFromFront.Id);
                    order.TotalOrder += productFromBase.Price * productFromFront.Quantity;
                    productFromFront.Price = productFromBase.Price;
                    order.TotalQuantity += productFromFront.Quantity;
                }

                );

            }
            catch
            {
                ///TODO: Implement logger
            }
        }
        public string Create(Order order)
        {
            try
            {
                ValidatePrices(order);
                Repo.InsertOne(order);
                return order.Id;
            }
            catch
            {
                ///TODO: Implement logger
            }
            return null;
        }

        public Order Get(string id)
        {
            return Repo.Find(f => f.Id == id).FirstOrDefault();
        }
    }

}