package CodeLK.me.SandaAsapuwaHMS.Payments;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface paymentRepository extends MongoRepository<Payment, ObjectId> {

    List<Payment> findBydateBetween(Date startDate, Date endDate);


}
