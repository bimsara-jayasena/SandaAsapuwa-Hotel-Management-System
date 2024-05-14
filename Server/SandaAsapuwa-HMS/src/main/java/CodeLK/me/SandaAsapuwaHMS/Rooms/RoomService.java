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
            RoomDTO roomDTO=new RoomDTO(room.getRoomId(),room.getAvailability(), room.getImages(),room.getKeyNum(),room.getCatagory());
            return roomDTO;
        }).toList();
        return roomDTOS;
    }

    public RoomDTO getRoom(String roomid) {
        Optional<Rooms> room=repository.findByroomId(roomid);
        Rooms actualRoom=room.orElseThrow(()->{
            throw new NullPointerException("No Room exist");
        });
        String file = actualRoom.getImages();
        RoomDTO roomDTO = new RoomDTO(actualRoom.getRoomId(), actualRoom.getAvailability(), actualRoom.getImages(),actualRoom.getKeyNum(),actualRoom.getCatagory());

        return roomDTO;
    }

    public Rooms addRooms(String availability,String file,Integer keyNum,String catagory) {
        Rooms rooms = new Rooms(availability, file,keyNum,catagory);
        repository.insert(rooms);
        return rooms;
    }

    public Rooms updateRoom(String roomId,String availability,String image){
        Optional<Rooms> roomsOptional=repository.findByroomId(roomId);
        Rooms room=roomsOptional.orElseThrow(()->{
            throw new NullPointerException("No room exist");

        });
        room.setAvailability(availability);
        room.setImages(image);
        repository.save(room);
        return room;
    }

    public String deleteRoom(String roomId) {
        Optional<Rooms> roomsOptional=repository.findByroomId(roomId);
        Rooms room=roomsOptional.orElseThrow(()->{
            throw new NullPointerException("No room exist");

        });
        repository.delete(room);
        return "Room "+roomId+" successfully removed";
    }




}
