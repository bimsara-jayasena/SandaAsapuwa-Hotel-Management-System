package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends MongoRepository<Rooms, ObjectId> {
   // Optional<Rooms> findByRoomId(String roomId);
     Optional<Rooms> findByroomId(String roomId);
     Optional<Rooms> findBykeyNum(Integer keyNum);
     List<Rooms> findBycatagory(String catagory);


}
