package CodeLK.me.SandaAsapuwaHMS.Employees;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpRepository extends MongoRepository<Employes, ObjectId> {
}
