package codeLk.me.v1.Employees;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
@Controller
@RequestMapping("/Employes")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpController {
    @Autowired
    private EmpService empService;

    @GetMapping
    public ResponseEntity<List<Employees>> showEmployees(){
        return new ResponseEntity<List<Employees>>(empService.showAllEmployees(),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Employees> addEmployee(@RequestBody Map<String,String> payload){
        return new ResponseEntity<Employees>(empService.addEmployee(
                payload.get("firstName"),
                payload.get("lastName"),
                payload.get("eMail"),
                payload.get("address"),
                payload.get("contactNo"),
                payload.get("position")
        ), HttpStatus.CREATED);
    }
}
