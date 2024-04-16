package codeLk.me.v1.Employees;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "employees")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employees {
    @Id
    private ObjectId id;

    private String empId;
    private String firstName;
    private String lastName;
    private String eMail;
    private String address;
    private String contactNo;
    private String position;


    public Employees(
                     String firstName,
                     String lastName,
                     String eMail,
                     String address,
                     String contactNo,
                     String position
                  )
    {

        this.empId=generateEmpId();;
        this.firstName=firstName;
        this.lastName=lastName;
        this.eMail=eMail;
        this.address=address;
        this.contactNo=contactNo;
        this.position=position;


    }
    private String generateEmpId() {
        // Generating a random UUID
        return UUID.randomUUID().toString();
    }


}
