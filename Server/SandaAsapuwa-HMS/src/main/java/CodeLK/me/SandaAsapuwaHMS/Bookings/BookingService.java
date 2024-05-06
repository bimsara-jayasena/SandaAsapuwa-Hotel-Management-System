package CodeLK.me.SandaAsapuwaHMS.Bookings;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.Date;
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
    public Bookings addBooking(
            String firstName,
            String lastName,
            String eMail,
            String pickUp,
            String contactNo,
            Integer guestCount,
            Date arrivalDate,
            String arrivalTime
    ){
        Bookings bookings=new Bookings(firstName,lastName,eMail,pickUp,contactNo,guestCount,arrivalDate,arrivalTime);
        repository.insert(bookings);
        return bookings;
    }
    public Bookings updateBooking(
            String bookingId,
            String firstName,
            String lastName,
            String eMail,
            String pickUp,
            String contactNo,
            Integer guestCount,
            Date arrivalDate,
            String arrivalTime,
            String Status
    ){
       Optional<Bookings> bookingsOptional=repository.findByBookingId(bookingId);
       Bookings bookings=bookingsOptional.orElseThrow(()->{throw new NullPointerException("No booking found");});
       if(firstName!=null){bookings.setFirstName(firstName);}
       if(lastName!=null){bookings.setLastName(lastName);}
       if(eMail!=null){bookings.seteMail(eMail);}
       if(pickUp!=null){bookings.setPickUp(pickUp);}
       if(contactNo!=null){bookings.setContactNo(contactNo);}
       if(guestCount!=null){bookings.setGuestCount(guestCount);}
       if(arrivalDate!=null){bookings.setArrivalDate(arrivalDate);}
       if(arrivalTime!=null){ bookings.setArrivalTime(arrivalTime);}
       if(Status!=null){ bookings.setStatus(Status);}
        repository.save(bookings);
        return bookings;
    }

}
