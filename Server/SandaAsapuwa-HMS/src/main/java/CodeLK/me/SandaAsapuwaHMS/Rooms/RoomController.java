package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.apache.coyote.Response;
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
    @GetMapping("/get-room/id/{roomid}")
    public ResponseEntity<RoomDTO> getRoom(@PathVariable String roomid){
        return new ResponseEntity<RoomDTO>(service.getRoom(roomid), HttpStatus.OK);
    }
    @GetMapping("/get-room/key/{keyNum}")
    public ResponseEntity<RoomDTO> getRoombykey(@PathVariable Integer keyNum){
        return new ResponseEntity<RoomDTO>(service.getRoombyKey(keyNum), HttpStatus.OK);
    }
    @GetMapping("/get-room/cat/{catagory}")
    public ResponseEntity<List<RoomDTO>> getRoombykey(@PathVariable String catagory){
        return new ResponseEntity<List<RoomDTO>>(service.getRoomByCatagory(catagory), HttpStatus.OK);
    }
     @PostMapping("/add-room")
    public ResponseEntity<Rooms> addRooms(
            @RequestParam("image") String image,
            @RequestParam("availability") String availability,
            @RequestParam("Key") Integer keyNum,
            @RequestParam("catagory") String catagory,
            @RequestParam("price") Integer price) throws IOException {
        return new ResponseEntity<Rooms>(service.addRooms(availability,image,keyNum,catagory,price), HttpStatus.CREATED);
    }

    @PutMapping("/update-room/{roomId}")
    public ResponseEntity<Rooms> updateRoom(
            @PathVariable String roomId,
            @RequestParam(value = "image" , required = false) String image,
            @RequestParam(value = "availability",required = false) String availability,
            @RequestParam(value = "key",required = false) Integer key,
            @RequestParam(value = "price",required = false) Integer price) throws IOException {
        return new ResponseEntity<Rooms>(service.updateRoom(roomId,availability,image,key,price), HttpStatus.CREATED);
    }
    @PatchMapping("/update-room/patch/{roomId}")
    public ResponseEntity<Rooms> patchRoom(
            @PathVariable String roomId,
            @RequestParam(value = "image" , required = false) String image,
            @RequestParam(value = "availability",required = false) String availability,
            @RequestParam(value = "key",required = false) Integer key,
            @RequestParam(value = "price",required = false) Integer price) throws IOException {
        return new ResponseEntity<Rooms>(service.updateRoom(roomId,availability,image,key,price), HttpStatus.CREATED);
    }

    @DeleteMapping("/remove-room/{roomId}")
    public String deleteRoom(
            @PathVariable String roomId
            ) {
        return (service.deleteRoom(roomId));
    }







}
