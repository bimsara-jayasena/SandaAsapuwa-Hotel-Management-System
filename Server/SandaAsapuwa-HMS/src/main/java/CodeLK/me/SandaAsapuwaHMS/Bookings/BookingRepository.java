package CodeLK.me.SandaAsapuwaHMS.Bookings;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Bookings, ObjectId> {
    Optional<Bookings> findByBookingId(String bookingId);
}
