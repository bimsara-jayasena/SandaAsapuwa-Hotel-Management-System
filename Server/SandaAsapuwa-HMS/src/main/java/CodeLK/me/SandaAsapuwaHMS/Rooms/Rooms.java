package CodeLK.me.SandaAsapuwaHMS.Rooms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.*;
import java.util.Collection;
import java.util.UUID;

@Document(collection = "rooms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rooms {
        @Id
        private ObjectId id;

        private String roomId;

        private  String availability;

        private  String images;
        private Integer keyNum;

        private String catagory;
        public Rooms(String availability,String images,Integer keyNum,String catagory){
            this.roomId = this.generateRoomId();
            this.images=images;
            this.availability=availability;
            this.keyNum=keyNum;
            this.catagory=catagory;
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

    private String generateRoomId(){
        return UUID.randomUUID().toString();
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
