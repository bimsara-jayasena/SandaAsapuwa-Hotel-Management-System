package CodeLK.me.SandaAsapuwaHMS.Rooms;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.util.UUID;

public class RoomDTO {

    @Id
    private ObjectId id;
     private String roomId;

    private  String availability;

    private  String images;
    public RoomDTO(String roomId,String availability,String image){
        this.roomId = roomId;

        this.availability=availability;
        this.images=image;

    }




    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }
}
