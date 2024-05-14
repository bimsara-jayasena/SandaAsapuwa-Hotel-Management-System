package CodeLK.me.SandaAsapuwaHMS.Payments;


import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Document(collection = "Payments")
public class Payment {
    private static String sourceId; // Square source ID
    private static Integer amount; // Payment amount


    private String paymentMethod;// Unique idempotency key

    public Payment(String sourceId, Integer amount, String paymentMethod) {
        this.sourceId = sourceId;
        this.amount = amount;
        this.paymentMethod=paymentMethod;
    }

    public static String getSourceId() {
        return sourceId;
    }

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public static Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
