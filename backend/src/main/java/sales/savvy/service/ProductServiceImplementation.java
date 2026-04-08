package sales.savvy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sales.savvy.entity.Product;
import sales.savvy.repository.ProductRepository;
import sales.savvy.repository.CartItemRepository;

@Service
public class ProductServiceImplementation implements ProductService {

    @Autowired
    private ProductRepository repo;

    @Autowired
    private CartItemRepository cartItemRepo;

    @Override
    public void addProduct(Product prod) {
        repo.save(prod);
    }

    @Override
    public Product searchProduct(Long id) {
        return repo.findById(id).get();
    }

    @Override
    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    @Override
    public void updateProduct(Product prod) {
        repo.save(prod);
    }

    @Override
    public void deleteProduct(Long id) {
        // Delete all CartItems related to this product to avoid FK constraint violation
        cartItemRepo.deleteByProdId(id);

        // Then delete the actual product
        repo.deleteById(id);
    }
}
