package CodeLK.me.SandaAsapuwaHMS.Payments;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface paymentRepository extends MongoRepository<Payment, ObjectId> {
}
