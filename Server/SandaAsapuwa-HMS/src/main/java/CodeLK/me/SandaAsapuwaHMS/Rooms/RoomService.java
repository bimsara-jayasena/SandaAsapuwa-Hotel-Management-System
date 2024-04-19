package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository repository;

    @Autowired
    private MongoTemplate template;

    public List<Rooms> getAllRooms(){
        return (repository.findAll());
    }


    public Optional<Rooms> getRoom(String roomId){
        return (repository.findByRoomId(roomId));
    }
    public Rooms addRooms(String url,String availability){
        Rooms rooms=new Rooms(url,availability);
        repository.insert(rooms);
        return rooms;
    }
    public Rooms updateRooms(String url,String availability,String roomId){
        Rooms rooms=new Rooms(url,availability);
        repository.insert(rooms);

        template.update(Rooms.class)
                .apply(new Update().push("roomId").value(roomId))
                .first();
        return rooms;
    }
    public String deleteRoom(String roomId){
        Rooms room=repository.findByroomId(roomId);
        repository.delete(room);
        return "Removed";

    }

}
