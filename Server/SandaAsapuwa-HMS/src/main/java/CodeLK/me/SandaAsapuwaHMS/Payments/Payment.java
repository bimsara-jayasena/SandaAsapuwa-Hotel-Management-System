package CodeLK.me.SandaAsapuwaHMS.Payments;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Document(collection = "Payments")
public class Payment {
    @Id
    private ObjectId id;
    private String token;
    private boolean verifiedBuyer;

    @DateTimeFormat
    private Date date;

    private String firstName;
    private String lastName;

    public Payment(String token, boolean verifiedBuyer, Date date, String firstName, String lastName) {
        this.token = token;
        this.verifiedBuyer = verifiedBuyer;
        this.date = date;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public boolean isVerifiedBuyer() {
        return verifiedBuyer;
    }

    public void setVerifiedBuyer(boolean verifiedBuyer) {
        this.verifiedBuyer = verifiedBuyer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
