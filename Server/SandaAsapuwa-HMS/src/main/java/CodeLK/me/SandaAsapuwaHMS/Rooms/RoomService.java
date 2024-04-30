package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository repository;

    @Autowired
    private MongoTemplate template;

    public List<RoomDTO> getAllRooms(){
        List<Rooms> rooms=repository.findAll();
        List<RoomDTO> roomDTOS=rooms.stream().map((room)->{
//            String file= Base64.getEncoder().encodeToString(room.getImages());
            RoomDTO roomDTO=new RoomDTO(room.getRoomId(),room.getAvailability(), room.getImages());
            return roomDTO;
        }).toList();
        return roomDTOS;
    }

    public Rooms addRooms(String availability,String file) throws IOException {

        Rooms rooms = new Rooms(availability, file);

        repository.insert(rooms);
        return rooms;
    }

//    public Rooms updateRoom(String roomId,String availability,String file) throws IOException {
//
//        Rooms rooms = repository.findByroomId(roomId);
//        rooms.setAvailability(availability);
//        rooms.setImages(file);
//
//        repository.save(rooms);
//        return rooms;
//    }
//
//    public String deleteRoom(String id){
//        Rooms rooms=repository.findByroomId(id);
//        repository.delete(rooms);
//        return "Room Removed";
//
//    }




}
