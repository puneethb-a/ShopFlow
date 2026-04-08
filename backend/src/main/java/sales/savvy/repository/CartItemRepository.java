package sales.savvy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sales.savvy.entity.CartItem;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartIdAndProdId(Long cartId, Long prodId);

    // ✅ Add this method to delete all CartItems that use a specific product ID
    void deleteByProdId(Long prodId);
}
