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
    private Integer keyNum;
    private String catagory;
    private Integer price;
    public RoomDTO(String roomId,String availability,String image,Integer keyNum,String catagory,Integer price){
        this.roomId = roomId;

        this.availability=availability;
        this.images=image;
        this.keyNum=keyNum;
        this.catagory=catagory;
        this.price=price;

    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getCatagory() {
        return catagory;
    }

    public void setCatagory(String catagory) {
        this.catagory = catagory;
    }

    public Integer getKeyNum() {
        return keyNum;
    }

    public void setKeyNum(Integer keyNum) {
        this.keyNum = keyNum;
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
