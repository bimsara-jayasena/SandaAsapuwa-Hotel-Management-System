package CodeLK.me.SandaAsapuwaHMS.Bookings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class bookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping()
    public ResponseEntity<List<Bookings>> getAllBookings(){
        return new ResponseEntity<List<Bookings>>(bookingService.getAllBookings(), HttpStatus.OK);
    }
    @GetMapping("/get-bookings/booking/{bookingId}")
    public ResponseEntity<Bookings> getAllBookings(@PathVariable String bookingId){
        return new ResponseEntity<Bookings>(bookingService.getBooking(bookingId), HttpStatus.OK);
    }
    @PostMapping("/add-booking")
    public ResponseEntity<Bookings> addBooking(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("pickup") String pickup,
            @RequestParam("contactNo") String contactNo,
            @RequestParam("guestCount") Integer guestCount,
            @RequestParam("arrivalDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date arrivalDate,
            @RequestParam("arrivalTime") String arrivalTime
    ){
        return new ResponseEntity<Bookings>(bookingService.addBooking(
                firstName,
                lastName,
                email,
                pickup,
                contactNo,
                guestCount,
                arrivalDate,
                arrivalTime
        ),HttpStatus.CREATED);
    }

    @PutMapping("/update-booking/{bookingId}")
    public ResponseEntity<Bookings> updateBooking(
            @PathVariable String bookingId,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("pickup") String pickup,
            @RequestParam("contactNo") String contactNo,
            @RequestParam("guestCount") Integer guestCount,
            @RequestParam("arrivalDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date arrivalDate,
            @RequestParam("arrivalTime") String arrivalTime,
            @RequestParam("Status") String Status
    ){
        if(Status==null){
            Status="confirmd";
        }
        return new ResponseEntity<Bookings>(bookingService.updateBooking(
                bookingId,
                firstName,
                lastName,
                email,
                pickup,
                contactNo,
                guestCount,
                arrivalDate,
                arrivalTime,
                Status
        ),HttpStatus.CREATED);
    }
    @PatchMapping("/update-booking/patch/{bookingId}")
    public ResponseEntity<Bookings> updateBookingS(
            @PathVariable String bookingId,
            @RequestParam(value = "firstName",required = false) String firstName,
            @RequestParam(value = "lastName",required = false) String lastName,
            @RequestParam(value = "email",required = false) String email,
            @RequestParam(value = "pickup",required = false) String pickup,
            @RequestParam(value = "contactNo",required = false) String contactNo,
            @RequestParam(value = "guestCount",required = false) Integer guestCount,
            @RequestParam(value = "arrivalDate",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date arrivalDate,
            @RequestParam(value = "arrivalTime",required = false) String arrivalTime,
            @RequestParam(value = "Status",required = false) String Status
    ){
        if(Status==null){
            Status="confirmd";
        }
        return new ResponseEntity<Bookings>(bookingService.updateBooking(
                bookingId,
                firstName,
                lastName,
                email,
                pickup,
                contactNo,
                guestCount,
                arrivalDate,
                arrivalTime,
                Status
        ),HttpStatus.CREATED);
    }

}
