package codeLk.me.v1.Employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class EmpService {
    @Autowired
    private empRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Employees> showAllEmployees(){
        return repository.findAll();
    }
    public Employees addEmployee(String firstName,
                                 String lastName,
                                 String eMail,
                                 String address,
                                 String contactNo,
                                 String position
                                )
    {
        Employees employees= repository.insert(new Employees(firstName,lastName,eMail,address,contactNo,position));
//        mongoTemplate.update(Employees.class)
//                .apply(new Update().push("firstName").value(firstName))
//                .first();

        return  employees;

    }
}
