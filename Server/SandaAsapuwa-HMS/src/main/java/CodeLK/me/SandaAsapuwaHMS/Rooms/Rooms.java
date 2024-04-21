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

        public Rooms(String availability){
            this.roomId = this.generateRoomId();

            this.availability=availability;
        }
        private String generateRoomId(){
        return UUID.randomUUID().toString();
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

}
