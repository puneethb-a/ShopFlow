package sales.savvy.service;

import java.util.List;
import sales.savvy.dto.CartData;
import sales.savvy.dto.CartItemDTO;

public interface CartService {
    void addToCart(CartData data);
    void updateCartItem(CartData data);
    List<CartItemDTO> getCartItems(String username);

    // ✅ New method to remove item from cart
    void removeItemFromCart(String username, Long productId);
}
