package CodeLK.me.SandaAsapuwaHMS.BookingCounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/Add-count")
    public ResponseEntity<BookingCounts> addCounts(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE,pattern = "yyyy-MM-dd") Date date,
            @RequestParam("count") Integer count
    ){
        return new ResponseEntity<BookingCounts>(countService.addBookingCounts(date,count),HttpStatus.CREATED);
    }
}
