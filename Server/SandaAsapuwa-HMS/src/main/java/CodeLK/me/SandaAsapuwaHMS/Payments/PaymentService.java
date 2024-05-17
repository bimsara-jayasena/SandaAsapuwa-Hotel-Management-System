package CodeLK.me.SandaAsapuwaHMS.Payments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private paymentRepository paymentRepository;
    public List<Payment> getPayment(){
        List<Payment> payment=paymentRepository.findAll();
        return payment;
    }
    public Payment adPayment(Integer amount,String paymentMethode,Date date){
       Payment payment=new Payment(amount,paymentMethode,date);
       paymentRepository.save(payment);
       return payment;
    }
}
