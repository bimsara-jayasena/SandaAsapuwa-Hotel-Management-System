package CodeLK.me.SandaAsapuwaHMS.Payments;

import com.squareup.square.SquareClient;
import com.squareup.square.exceptions.ApiException;
import com.squareup.square.models.CreatePaymentRequest;
import com.squareup.square.models.CreatePaymentResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController

@RequestMapping("/Payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get-payment")
    public ResponseEntity<List<Payment>> getPayment(){
        return new ResponseEntity<List<Payment>>(paymentService.getPayment(),HttpStatus.OK);

    }
    @PostMapping("/add-payment")
    public ResponseEntity<Payment> getPayment(
            @RequestParam("amount") Integer amount,
            @RequestParam("paymentMethode") String paymentMethode,
            @RequestParam("date") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date date
            ){
        return new ResponseEntity<Payment>(paymentService.adPayment(amount,paymentMethode,date),HttpStatus.OK);

    }


}
