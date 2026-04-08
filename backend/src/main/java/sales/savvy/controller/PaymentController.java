package sales.savvy.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import sales.savvy.dto.PaymentRequest;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*") // Allow frontend to access this
public class PaymentController {

    @PostMapping("/createOrder")
    public String createOrder(@RequestBody PaymentRequest paymentRequest) {
        try {
            RazorpayClient client = new RazorpayClient("rzp_test_RHXMyqikEEy2SS", "7R0yUZ0CJuEPP8RqupSm5xNQ");

            JSONObject options = new JSONObject();
            options.put("amount", paymentRequest.getAmount() * 100); // amount in paise
            options.put("currency", "INR");
            options.put("receipt", "txn_" + System.currentTimeMillis());
            options.put("payment_capture", 1);

            Order order = client.orders.create(options);

            return order.toString(); // This will return order ID to frontend
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while creating order";
        }
    }
}
