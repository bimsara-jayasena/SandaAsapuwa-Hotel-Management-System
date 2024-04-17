package CodeLK.me.SandaAsapuwaHMS.Employees;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/Employes")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpController {
    @Autowired
    private EmpService service;

    @GetMapping
    public ResponseEntity<List<Employes>> showEmployes(){
        return new ResponseEntity<List<Employes>>(service.getAllEmployees(),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Employes>addEmploye(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Employes>(service.addEmployee(
                payload.get("firstName"),
                payload.get("lastName"),
                payload.get("eMail"),
                payload.get("address"),
                payload.get("contactNo"),
                payload.get("position")
                ), HttpStatus.CREATED);
    }
}
