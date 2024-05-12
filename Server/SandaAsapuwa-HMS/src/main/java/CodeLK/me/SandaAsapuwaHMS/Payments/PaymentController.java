package CodeLK.me.SandaAsapuwaHMS.Payments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @PostMapping("/processPayment")
    public String processPayment(@RequestParam("token") String token,@RequestParam("verifiedBuyer") boolean verifiedBuyer) {
        // Here you would interact with Square APIs to process the payment
        // You might use Square SDK or make HTTP requests directly

        // For example, you could call a service method to process the payment
        boolean paymentProcessed = paymentService.processPayment(token,verifiedBuyer);

        if (paymentProcessed) {
            return "Payment processed successfully";
        } else {
            return "Payment processing failed";
        }
    }
}
