package CodeLK.me.SandaAsapuwaHMS.Bookings;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository repository;

    public List<Bookings> getAllBookings(){return repository.findAll();}

    public Bookings getBooking(String id){
        Optional<Bookings> bookingsOptional=repository.findByBookingId(id);
        Bookings bookings=bookingsOptional.orElseThrow(()->{throw new NullPointerException("no resources found!");});
        return  bookings;
    }
}
