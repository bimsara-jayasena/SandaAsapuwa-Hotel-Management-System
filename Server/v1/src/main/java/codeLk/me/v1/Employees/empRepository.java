package codeLk.me.v1.Employees;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface empRepository extends MongoRepository<Employees, ObjectId> {
}
