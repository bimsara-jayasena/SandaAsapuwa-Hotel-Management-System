package CodeLK.me.SandaAsapuwaHMS.Employees;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

public class EmployesDTO {






        @Id
        private ObjectId id;
        private String empId;

        private String profileImg;
        private String firstName;
        private String lastName;
        private String fullName;
        private String eMail;
        private String address;
        private String contactNo;
        private String position;
        private String password;

        public EmployesDTO( String profileImg,
                            String empId,
                            String firstName,
                            String lastName,
                            String eMail,
                            String address,
                            String contactNo,
                            String position,
                            String password){

            this.profileImg=profileImg;
            this.empId=empId;
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName=firstName+lastName;
            this.eMail = eMail;
            this.address = address;
            this.contactNo = contactNo;
            this.position = position;
            this.password=password;
        }

        public String getProfileImg() {
            return profileImg;
        }

    public String getEmpId() {
        return empId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setProfileImg(String profileImg) {
            this.profileImg = profileImg;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String geteMail() {
            return eMail;
        }

        public void seteMail(String eMail) {
            this.eMail = eMail;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getContactNo() {
            return contactNo;
        }

        public void setContactNo(String contactNo) {
            this.contactNo = contactNo;
        }

        public String getPosition() {
            return position;
        }

        public void setPosition(String position) {
            this.position = position;
        }

        private String generateEmpId(){
            return UUID.randomUUID().toString();
        }





}
