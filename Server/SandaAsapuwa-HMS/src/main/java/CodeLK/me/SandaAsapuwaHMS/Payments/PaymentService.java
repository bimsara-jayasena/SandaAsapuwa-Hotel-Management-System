package CodeLK.me.SandaAsapuwaHMS.Payments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Calendar;
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

    public List<Payment> getPaymentByMonth(int year, int month){
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startDate = calendar.getTime();

        calendar.set(year, month, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date endDate = calendar.getTime();

        List<Payment> payments=paymentRepository.findBydateBetween(startDate,endDate);
        return payments.stream().toList();
    }
    public List<Payment> getPaymentByYear(int year){
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, 0, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startDate = calendar.getTime();

        calendar.set(year, 11, 31, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date endDate = calendar.getTime();

        List<Payment> payments=paymentRepository.findBydateBetween(startDate,endDate);
        return payments.stream().toList();
    }

    public int getTotalPaymentForMonth(int year, int month) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startDate = calendar.getTime();

        calendar.set(year, month, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date endDate = calendar.getTime();

        List<Payment> payments = paymentRepository.findBydateBetween(startDate, endDate);

        return payments.stream().mapToInt(Payment::getAmount).sum();
    }
    public int getTotalPaymentForYear(int year) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, 0, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startDate = calendar.getTime();

        calendar.set(year, 11, 31, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date endDate = calendar.getTime();

        List<Payment> payments=paymentRepository.findBydateBetween(startDate,endDate);
        return payments.stream().mapToInt(Payment::getAmount).sum();
    }




    public Payment adPayment(Integer amount,String paymentMethode,Date date){
       Payment payment=new Payment(amount,paymentMethode,date);
       paymentRepository.save(payment);
       return payment;
    }


}
