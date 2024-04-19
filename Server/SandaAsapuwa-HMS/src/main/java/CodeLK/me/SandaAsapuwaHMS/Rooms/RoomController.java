package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/Rooms")
public class RoomController {
    @Autowired
    private RoomService service;

    @GetMapping
    public ResponseEntity<List<Rooms>> getAllRooms(){
        return new ResponseEntity<List<Rooms>>(service.getAllRooms(), HttpStatus.OK);
    }


    @GetMapping("/roomId/{roomId}")
    public ResponseEntity<Optional<Rooms>> getRoom(@PathVariable String roomId){
        return new ResponseEntity<Optional<Rooms>>(service.getRoom(roomId),HttpStatus.OK);
    }
    @PostMapping
    public  ResponseEntity<Rooms> addRooms(@RequestBody Map<String,String> payload){
        return new ResponseEntity<Rooms>(service.addRooms(
                payload.get("url"),
                payload.get("availability")
        ),HttpStatus.CREATED);

    }
    @PutMapping("/update/{roomId}")
    public ResponseEntity<Rooms> updateRoom(@PathVariable String roomId,@RequestBody Map<String,String> payload){
        return  new ResponseEntity<Rooms>(service.updateRooms(
                payload.get("url"),
                payload.get("availability"),
                roomId
        ),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{roomId}")
    public String removeRooms(@PathVariable("roomId") String roomId){
         return service.deleteRoom(roomId);

    }
}
