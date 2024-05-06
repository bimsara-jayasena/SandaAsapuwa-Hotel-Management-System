package CodeLK.me.SandaAsapuwaHMS.Bookings;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Document(collection = "bookings")
@NoArgsConstructor
@AllArgsConstructor
public class Bookings {
    @Id
    private ObjectId id;
    private String bookingId;
    private String firstName;
    private String lastName;
    private String eMail;

    private String pickUp;
    private String contactNo;
    private Integer guestCount;
    private String status;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME ,pattern =  "yyyy-MM-dd")
    private Date arrivalDate;
    private String arrivalTime;

    public Bookings(String firstName, String lastName, String eMail,String pickUp, String contactNo, Integer guestCount, Date arrivalDate, String arrivalTime) {
        this.bookingId=setBookingId();
        this.firstName = firstName;
        this.lastName = lastName;
        this.eMail = eMail;
        this.pickUp=pickUp;
        this.contactNo = contactNo;
        this.guestCount = guestCount;
        this.arrivalDate = arrivalDate;
        this.arrivalTime = arrivalTime;
        this.status="unconfirmed";
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBookingId() {
        return bookingId;
    }

    public String getPickUp() {
        return pickUp;
    }

    public void setPickUp(String pickUp) {
        this.pickUp = pickUp;
    }

    public String setBookingId() {
        return UUID.randomUUID().toString();
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

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }



    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public Integer getGuestCount() {
        return guestCount;
    }

    public void setGuestCount(Integer guestCount) {
        this.guestCount = guestCount;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }
}
