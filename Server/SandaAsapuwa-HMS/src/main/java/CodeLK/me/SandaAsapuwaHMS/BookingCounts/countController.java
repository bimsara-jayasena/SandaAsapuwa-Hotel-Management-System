package CodeLK.me.SandaAsapuwaHMS.BookingCounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Counts")
@CrossOrigin(origins = "http://localhost:3000")
public class countController {
    @Autowired
    private countService countService;
    @GetMapping
    public ResponseEntity<List<BookingCounts>> getCounts(){
        return new ResponseEntity<List<BookingCounts>>(countService.getCounts(), HttpStatus.OK);
    }
    @GetMapping("/get-counts/{start}/{end}")
    public ResponseEntity<List<BookingCounts>> getCounts(
            @PathVariable("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date start,
            @PathVariable("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date end
    ){
        return new ResponseEntity<List<BookingCounts>>(countService.getCountsDateRange(start, end), HttpStatus.OK);
    }

    @GetMapping("/totalBookingsForMonths/{year}/{month}")
    public int getTotalBookings(@PathVariable("year") int year, @PathVariable("month") int month) {
        return countService.getTotalBookingsForMonth(year, month);
    }

    @GetMapping("/totalBookingsForYear/{year}")
    public int getTotalBookingsWithinYear(@PathVariable("year") int year) {
        return countService.getTotalCountForYear(year);
    }
    @PostMapping("/Add-count")
    public ResponseEntity<BookingCounts> addCounts(

            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd")Date  date,
            @RequestParam("count") Integer count

    ){
        return new ResponseEntity<BookingCounts>(countService.addBookingCounts(date,count),HttpStatus.CREATED);
    }
    @PatchMapping("/update-count/{counterId}")
    public ResponseEntity<BookingCounts> updateCount(
            @PathVariable String counterId,
            @RequestParam(value = "date",required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date date,
            @RequestParam(value = "count",required = false) Integer count
    ){
        return new ResponseEntity<BookingCounts>(countService.updateBookingCounts(counterId,date,count),HttpStatus.CREATED);
    }
    @DeleteMapping("/delete/{date}")
    public String del(@PathVariable Integer count){
        return (countService.del(count));
    }
}
