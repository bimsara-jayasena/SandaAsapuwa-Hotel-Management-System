package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


    public Rooms getRoom(String roomId){
        return (repository.findByroomId(roomId));
    }
    public Rooms addRooms(String availability) {

        Rooms rooms = new Rooms(availability);

        repository.insert(rooms);
        return rooms;
    }

//    public Rooms updateRooms(String url,String availability,String roomId){
//        Rooms rooms=repository.findByroomId(roomId);
//        rooms.setAvailability(availability);
//        rooms.setUrl(url);
//
//        return repository.save(rooms);
//    }
    public String deleteRoom(String roomId){
        Rooms room=repository.findByroomId(roomId);
        repository.delete(room);
        return "Removed";

    }

}
