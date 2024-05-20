package CodeLK.me.SandaAsapuwaHMS.Bookings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Bookings> getAllBookings(){
        return bookingRepository.findAll();
    }

    public Bookings getBooking(String id){
        Optional<Bookings> bookingsOptional=bookingRepository.findByBookingId(id);
        Bookings bookings=bookingsOptional.orElseThrow(()->{throw new NullPointerException("no resources found!");});
        return  bookings;
    }
    public Bookings addBooking(

            Object[] rooms,
            Object[] keys,
            String firstName,
            String lastName,
            String eMail,
            String pickUp,
            String contactNo,
            Integer guestCount,
            Date arrivalDate,
            Date departureDate,
            String status
    ){
        Bookings bookings=new Bookings(rooms,keys,firstName,lastName,eMail,pickUp,contactNo,guestCount,arrivalDate,departureDate);
        if(status==null){bookings.setStatus("unconfirmed");}
        else {
            bookings.setStatus(status);
        }

        bookingRepository.insert(bookings);
        return bookings;
    }
    public Bookings updateBooking(
            String bookingId,
            String Status
    ){
       Optional<Bookings> bookingsOptional=bookingRepository.findByBookingId(bookingId);
       Bookings bookings=bookingsOptional.orElseThrow(()->{throw new NullPointerException("No booking found");});

        bookings.setStatus(Status);
        bookingRepository.save(bookings);
        return bookings;
    }

}
