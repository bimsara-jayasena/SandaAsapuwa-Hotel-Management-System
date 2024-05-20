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
    @GetMapping("/get-bookings/id/{bookingId}")
    public ResponseEntity<Bookings> getBooking(@PathVariable("bookingId") String bookingId){
        return new ResponseEntity<Bookings>(bookingService.getBooking(bookingId), HttpStatus.OK);
    }
    @PostMapping("/add-booking")
    public ResponseEntity<Bookings> addBooking(

            @RequestParam("rooms") Object[] rooms,
            @RequestParam("keys") Object[] keys,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam(value = "email",required = false) String email,
            @RequestParam(value = "pickup",required = false) String pickup,
            @RequestParam(value = "contactNo",required = false) String contactNo,
            @RequestParam("guestCount") Integer guestCount,
            @RequestParam(value = "arrivalDate",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date arrivalDate,
            @RequestParam(value = "departureDate",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date departureDate,
            @RequestParam(value = "status",required = false) String status
    ){
        return new ResponseEntity<Bookings>(bookingService.addBooking(

                rooms,
                keys,
                firstName,
                lastName,
                email,
                pickup,
                contactNo,
                guestCount,
                arrivalDate,
                departureDate,
                status
        ),HttpStatus.CREATED);
    }
    @PatchMapping("/update-booking/patch/{bookingId}")
    public ResponseEntity<Bookings> updateBookingS(
            @PathVariable String bookingId,
            @RequestParam(value = "Status",required = false) String Status
    ) {
        if (Status == null) {
            Status = "confirmd";
        }
        return new ResponseEntity<Bookings>(bookingService.updateBooking(
                bookingId,
                Status
        ), HttpStatus.CREATED);
    }


}
