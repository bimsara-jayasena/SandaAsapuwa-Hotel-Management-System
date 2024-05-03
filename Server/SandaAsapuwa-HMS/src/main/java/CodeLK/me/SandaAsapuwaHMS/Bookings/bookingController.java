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

}
