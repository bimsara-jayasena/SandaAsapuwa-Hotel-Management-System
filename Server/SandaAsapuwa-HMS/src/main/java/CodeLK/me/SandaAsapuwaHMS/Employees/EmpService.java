package CodeLK.me.SandaAsapuwaHMS.Employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class EmpService {
    @Autowired
    private EmpRepository repository;
    public List<EmployesDTO> getAllEmployees(){
        List<Employes> employes=repository.findAll();
        List<EmployesDTO> employesDTOS=employes.stream().map((employe)->{
//            String file= Base64.getEncoder().encodeToString(employe.getProfileImg());
            EmployesDTO employesDTO=new EmployesDTO(
                    employe.getProfileImg(),
                   employe.getEmpId(),
                   employe.getFirstName(),
                    employe.getLastName(),
                    employe.geteMail(),
                    employe.getAddress(),
                    employe.getContactNo(),
                    employe.getPosition(),
                    employe.getPassword()
            );
            return employesDTO;
        }).toList();
        return employesDTOS;
    }
    public EmployesDTO getEmployebyFullName(String fullName) {

            Employes employe= repository.findByfullName(fullName);
            if(employe==null){throw new RuntimeException("No resources found");}
//            String file= Base64.getEncoder().encodeToString(employe.getProfileImg());
            EmployesDTO employeDTO=new EmployesDTO(
                    employe.getProfileImg(),
                        employe.getEmpId(),
                        employe.getFirstName(),
                        employe.getLastName(),
                        employe.geteMail(),
                        employe.getAddress(),
                        employe.getContactNo(),
                        employe.getPosition(),
                        employe.getPassword()
                );
                return employeDTO;

    }
    public EmployesDTO getEmployebyEmpId(String empId) {
        Employes employe= repository.findByEmpId(empId);
        if(employe==null){throw new RuntimeException("No resources found");}
        //String file= Base64.getEncoder().encodeToString(employe.getProfileImg());
        EmployesDTO employeDTO=new EmployesDTO(
                employe.getProfileImg(),
                employe.getEmpId(),
                employe.getFirstName(),
                employe.getLastName(),
                employe.geteMail(),
                employe.getAddress(),
                employe.getContactNo(),
                employe.getPosition(),
                employe.getPassword()
        );
        return employeDTO;

    }

    public Employes addEmployee(
            String img,
            String firstName,
            String lastName,
            String eMail,
            String address,
            String contactNo,
            String position,
            String password) throws IOException
    {
        Employes employes=new Employes(img,firstName, lastName, eMail, address, contactNo, position,password);
        repository.insert(employes);
        return employes;
    }
    public Employes updateEmployee(
            String id,
           String img,
            String firstName,
            String lastName,
            String eMail,
            String address,
            String contactNo,
            String position,
            String password)throws IOException{

        Employes employes=repository.findByEmpId(id);
        if(employes==null){throw new RuntimeException("No resources found");}

        employes.setProfileImg(img);
        employes.setFirstName(firstName);
        employes.setLastName(lastName);
        employes.seteMail(eMail);
        employes.setAddress(address);
        employes.setContactNo(contactNo);
        employes.setPosition(position);
        employes.setPassword(password);

        repository.save(employes);
        return employes;


    }

        //Delete
        public String removeEmploye(String empId){
            Employes employe=repository.findByEmpId(empId);
            repository.delete(employe);
            return "employee "+employe.getFirstName()+" "+employe.getLastName()+" Removed successfully";
        }


}
