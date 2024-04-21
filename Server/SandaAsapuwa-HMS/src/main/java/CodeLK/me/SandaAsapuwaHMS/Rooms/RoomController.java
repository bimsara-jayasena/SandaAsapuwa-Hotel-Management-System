package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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


    @GetMapping("/id/{roomId}")
    public ResponseEntity<Rooms> getRoom(@PathVariable String roomId){
        return new ResponseEntity<Rooms>(service.getRoom(roomId),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Rooms> addRooms(@RequestParam("image") MultipartFile image,
                                          @RequestParam("availability") String availability) {
        return new ResponseEntity<>(service.addRooms(availability), HttpStatus.CREATED);
    }

//    @PutMapping("/id/{roomId}")
//    public ResponseEntity<Rooms> updateRoom(@PathVariable String roomId,@RequestBody Map<String,String> payload){
//        return  new ResponseEntity<Rooms>(service.updateRooms(
//                payload.get("url"),
//                payload.get("availability"),
//                roomId
//        ),HttpStatus.OK);
//    }
    @DeleteMapping("/id/{roomId}")
    public String removeRooms(@PathVariable("roomId") String roomId){
         return service.deleteRoom(roomId);

    }
}
