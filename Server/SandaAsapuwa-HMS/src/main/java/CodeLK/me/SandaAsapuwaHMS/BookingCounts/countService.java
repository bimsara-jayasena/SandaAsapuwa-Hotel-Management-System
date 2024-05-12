package CodeLK.me.SandaAsapuwaHMS.BookingCounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class countService {
    @Autowired
    private BookingCountRepository bookingCountRepository;
    public List<BookingCounts> getCounts(){
        return bookingCountRepository.findAll();
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
}
