package CodeLK.me.SandaAsapuwaHMS.BookingCounts;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Document(collection = "bookingCounts")
@AllArgsConstructor
@NoArgsConstructor
public class BookingCounts {
    @Id
    private ObjectId id;

    private String counterId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME ,pattern =  "yyyy-MM-dd")
    private Date Date;

    private Integer count;

    public BookingCounts(Date date,Integer count){
        this.counterId=setCounterId();
        this.Date=date;
        this.count=count;
    }

    public java.util.Date getDate() {
        return Date;
    }

    public String getCounterID() {
        return counterId;
    }

    public void setDate(java.util.Date date) {
        Date = date;
    }

    public Integer getCount() {
        return count;
    }

    public String setCounterId() {
        return UUID.randomUUID().toString();
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
