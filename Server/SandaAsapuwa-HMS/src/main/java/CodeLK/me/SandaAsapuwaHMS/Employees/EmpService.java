package CodeLK.me.SandaAsapuwaHMS.Employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpService {
    @Autowired
    private EmpRepository repository;
    public List<Employes> getAllEmployees(){
        return repository.findAll();
    }
    public Employes addEmployee(String firstName, String lastName, String eMail, String address, String contactNo, String position){
        Employes employes=new Employes(firstName, lastName, eMail, address, contactNo, position);
        repository.insert(employes);
        return employes;
    }
    public Employes updateEmployee(String firstName, String lastName, String eMail, String address, String contactNo, String position){
        Employes employes=new Employes(firstName, lastName, eMail, address, contactNo, position);
        repository.insert(employes);
        return employes;
    }


}
