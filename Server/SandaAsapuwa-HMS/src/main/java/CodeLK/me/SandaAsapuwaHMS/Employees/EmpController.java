package CodeLK.me.SandaAsapuwaHMS.Employees;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/Employes")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpController {

//    NEW TEST
    @Autowired
    private EmpService service;

    @GetMapping
    public ResponseEntity<List<EmployesDTO>> showEmployes(){
        return new ResponseEntity<List<EmployesDTO>>(service.getAllEmployees(),HttpStatus.OK);
    }
    @GetMapping("/full-name/{fullName}")
    public ResponseEntity<EmployesDTO> showEmployes(@PathVariable String fullName){
        return new ResponseEntity<EmployesDTO>(service.getEmployebyFullName( fullName),HttpStatus.OK);
    }

    @GetMapping("/empid/{empId}")
    public ResponseEntity<EmployesDTO> getEmployeeById(@PathVariable String empId){
        return new ResponseEntity<EmployesDTO>(service.getEmployebyEmpId( empId),HttpStatus.OK);
    }
//    @PostMapping("/add-employe")
//    public ResponseEntity<Employes>addEmploye(
//            @RequestParam("profile-image")MultipartFile profileImg,
//           @RequestParam("firstName") String firstName,
//            @RequestParam("lastName")String lastName,
//            @RequestParam("eMail")String email,
//            @RequestParam("address")String address,
//            @RequestParam("contactNo")String contactNo,
//            @RequestParam("position")String position,
//            @RequestParam("password")String password
//            ) throws IOException {
//        return new ResponseEntity<Employes>(service.addEmployee(
//               profileImg,firstName,lastName,email,address,contactNo,position,password
//                ), HttpStatus.CREATED);
//    }

    @PostMapping("/add-employe")
    public ResponseEntity<Employes>addEmploye(
            @RequestParam("profile-image")String profileImg,
           @RequestParam("firstName") String firstName,
            @RequestParam("lastName")String lastName,
            @RequestParam("eMail")String email,
            @RequestParam("address")String address,
            @RequestParam("contactNo")String contactNo,
            @RequestParam("position")String position,
            @RequestParam("password")String password,
            @RequestParam("availability") String availability
            ) throws IOException {
        return new ResponseEntity<Employes>(service.addEmployee(
               profileImg,firstName,lastName,email,address,contactNo,position,password,availability
                ), HttpStatus.CREATED);
    }
    @PutMapping("update-employe/{empId}")
    public ResponseEntity<Employes> updateEmploye(
            @PathVariable String empId,
            @RequestParam("profile-image")String profileImg,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName")String lastName,
            @RequestParam("eMail")String email,
            @RequestParam("address")String address,
            @RequestParam("contactNo")String contactNo,
            @RequestParam("position")String position,
            @RequestParam("password")String password,
            @RequestParam("availability") String availability)throws IOException{
        return new ResponseEntity<Employes>(service.updateEmployee(
                empId,
                profileImg,
                firstName,
                lastName,
                email,
                address,
                contactNo,
                position,
                password,
                availability
        ),HttpStatus.OK);
    }
    @PatchMapping("update-employe/patch/{empId}")
    public ResponseEntity<Employes> patchEmploye(
            @PathVariable String empId,
            @RequestParam(value = "profile-image",required = false)String profileImg,
            @RequestParam(value = "firstName",required = false) String firstName,
            @RequestParam(value = "lastName",required = false)String lastName,
            @RequestParam(value = "eMail",required = false)String email,
            @RequestParam(value = "address",required = false)String address,
            @RequestParam(value = "contactNo",required = false)String contactNo,
            @RequestParam(value = "position",required = false)String position,
            @RequestParam(value = "password",required = false)String password,
            @RequestParam(value = "availability",required = false) String availability)throws IOException{
        return new ResponseEntity<Employes>(service.updateEmployee(
                empId,
                profileImg,
                firstName,
                lastName,
                email,
                address,
                contactNo,
                position,
                password,
                availability
        ),HttpStatus.OK);
    }

    @DeleteMapping("/delete-employe/{empId}")
    public String removeEmploye(@PathVariable String empId){
        return service.removeEmploye(empId);
    }
}
