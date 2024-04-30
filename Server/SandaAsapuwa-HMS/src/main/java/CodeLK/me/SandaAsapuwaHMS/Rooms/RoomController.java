package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<List<RoomDTO>> getAllRooms(){
        return new ResponseEntity<List<RoomDTO>>(service.getAllRooms(), HttpStatus.OK);
    }


    @PostMapping("/add-Room")
    public ResponseEntity<Rooms> addRooms(
            @RequestParam("image") String image,
            @RequestParam("availability") String availability) throws IOException {
        return new ResponseEntity<Rooms>(service.addRooms(availability,image), HttpStatus.CREATED);
    }
//    @PutMapping("/update-Room.{id}")
//    public ResponseEntity<Rooms> updateRooms(
//            @PathVariable String roomId,
//            @RequestParam("image") MultipartFile image,
//            @RequestParam("availability") String availability) throws IOException {
//        return new ResponseEntity<Rooms>(service.updateRoom(roomId,availability,image), HttpStatus.ACCEPTED);
//    }
//
//    @DeleteMapping("/Delete/{id}")
//    public String delRoom(@PathVariable String id){
//        return (service.deleteRoom(id));
//    }



}
