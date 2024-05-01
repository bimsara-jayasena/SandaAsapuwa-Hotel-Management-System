package CodeLK.me.SandaAsapuwaHMS.Employees;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpRepository extends MongoRepository<Employes, ObjectId> {
     Employes findByfullName(String fullName);
     Optional<Employes> findByEmpId(String empId);
}
