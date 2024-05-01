package CodeLK.me.SandaAsapuwaHMS.Bookings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Bookings")
@CrossOrigin(origins = "http://localhost:8080")
public class bookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/get-bookings")
    public ResponseEntity<List<Bookings>> getAllBookings(){
        return new ResponseEntity<List<Bookings>>(bookingService.getAllBookings(), HttpStatus.OK);
    }
    @GetMapping("/get-bookings/booking/{bookingId}")
    public ResponseEntity<Bookings> getAllBookings(@PathVariable String bookingId){
        return new ResponseEntity<Bookings>(bookingService.getBooking(bookingId), HttpStatus.OK);
    }

}
