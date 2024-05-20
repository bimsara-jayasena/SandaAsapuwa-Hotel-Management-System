package CodeLK.me.SandaAsapuwaHMS.BookingCounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Year;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class countService {
    @Autowired
    private BookingCountRepository bookingCountRepository;
    public static final DateTimeFormatter DATABASE_DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public List<BookingCounts> getCounts(){
        return bookingCountRepository.findAll();
    }

    public List<BookingCounts> getCountsDateRange(Date start,Date end){
        System.out.println("Start Date: " + start);




        return bookingCountRepository.findBydateBetween(start,end);
    }
    public BookingCounts addBookingCounts(Date date, Integer count){
        BookingCounts bookingCounts=new BookingCounts(date,count);
        bookingCountRepository.insert(bookingCounts);
        return bookingCounts;
    }
    public BookingCounts updateBookingCounts(String id,Date date, Integer count){

        Optional<BookingCounts> optionalBookingCounts=bookingCountRepository.findByCounterId(id);
        BookingCounts bookingCounts=optionalBookingCounts.orElseThrow(()->{throw new NullPointerException("not found");});
        if(date!=null){bookingCounts.setDate(date);}
        if(count!=null){bookingCounts.setCount(count);}

        bookingCountRepository.save(bookingCounts);
        return bookingCounts;
    }
    public String del(Integer c){
        List<BookingCounts> b=bookingCountRepository.findByCount(c);
        bookingCountRepository.deleteAll(b);


        return "done";
    }
    public int getTotalBookingsForMonth(int year, int month) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date startDate = calendar.getTime();

        calendar.set(year, month, 1, 0, 0, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        Date endDate = calendar.getTime();

        List<BookingCounts> bookings = bookingCountRepository.findBydateBetween(startDate, endDate);

        return bookings.stream().mapToInt(BookingCounts::getCount).sum();
    }
    public int getTotalCountForYear(int year) {
        LocalDate startDate = Year.of(year).atDay(1);
        LocalDate endDate = Year.of(year).atMonth(12).atEndOfMonth();

        Instant startInstant=startDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant endInstant=endDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        List<BookingCounts> bookingCounts = bookingCountRepository.findBydateBetween(Date.from(startInstant), Date.from(endInstant));

        return bookingCounts.stream().mapToInt(BookingCounts::getCount).sum();
    }
}
