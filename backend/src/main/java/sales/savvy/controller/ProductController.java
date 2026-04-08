package sales.savvy.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import sales.savvy.entity.Product;
import sales.savvy.service.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService service;

    // ✅ Add product
    @PostMapping("/addProduct")
    public String addProduct(@RequestBody Product prod) {
        service.addProduct(prod);
        return "Product added successfully!";
    }

    // ✅ Search product
    @GetMapping("/search")
    public Product searchProduct(@RequestParam Long id) {
        return service.searchProduct(id);
    }

    // ✅ Get all
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    // ✅ Update product
    @PutMapping("/updateProduct")
    public String updateProduct(@RequestBody Product prod) {
        service.updateProduct(prod);
        return "Product updated successfully!";
    }

    // ✅ Delete by path variable
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully!");
    }
}
