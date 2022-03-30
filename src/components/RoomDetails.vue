<template>
    <div> <br>
        <div class="container">
            <div class="room-info"> <br>
                <h4>{{ room.name }} (floor {{room.floor}})</h4><br>
                <li>current room temperature : <span>{{ room.currentTemperature }} °C</span></li>
            
                <li>
                <input placeholder="New Current Temperature (°C)" type="text" id="newCurrentTemperature" name="newCurrentTemperature" v-model="newCurrentTemperature"/>
                <button @click="changeCurrentTemperature(room.id)" type="button" class="good-btn">Update Current T°</button>
                </li><br>
                
                <li>target room temperature : <span>{{ room.targetTemperature }} °C</span></li>
            
                <li>
                <input placeholder="New Target Temperature (°C)" type="text" v-model="newTargetTemperature"/>
                <button @click="changeTargetTemperature(room.id)" type="button" class="good-btn">Update Target T°</button>
                </li><br>

                <li>This room currently has <span>{{ windowCount }}</span> windows 
                <button @click="redirectToWindowAdd()" type="button" class="good-btn">Add Windows</button>
                </li><br>
            </div>
        </div>

        <div class="delete-the-room">
            <button @click="deleteRoom(room.id)" type="button" class="btn btn-danger">Delete room</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            room: [],
            newCurrentTemperature:'',
            newTargetTemperature:'',
            windowCount:'',
            roomName: '',
            currentTemperature: '',
            targetTemperature: '',
            buildingId: '',
            floor:'',
        }
    },
    methods: {
        async deleteRoom(id) {
        /* Find the place of room object with the same Id in the array, and replace it */
            await axios.delete("http://127.0.0.1:8080/api/"+"room/" + id);
            this.$router.push('/rooms-list')
        },
        
        async changeTargetTemperature(id) {
            if (this.room.currentTemperature=="NO DATA"){
                this.room.currentTemperature = null
            };
            
            let roomToSend = {
            "buildingId": -10,
            "currentTemperature": this.room.currentTemperature,
            "floor": JSON.stringify(this.room.floor),
            "id": null,
            "name": this.room.name,
            "targetTemperature": this.newTargetTemperature
            };  
            const apiUrl = "http://127.0.0.1:8080/api/";
            if (this.newTargetTemperature>50 && this.newTargetTemperature<=100){alert("Milder temperatures might be more suitable for work")}
            else if (this.newTargetTemperature>100 && this.newTargetTemperature<=200){alert("Get a little steam in here and you'll have a nice sauna!")}
            else if (this.newTargetTemperature>200){alert("Can't receive complaints about the heat if nobody lives to tell the tale")}
            else if(this.newTargetTemperature>=-373 && this.newTargetTemperature<-10){alert("You might enjoy some frosty coffee")}
            else if(this.newTargetTemperature<-373){alert("Trying to stop time, are we?")};
            const oldWindowList = await axios.get(apiUrl +"windows");
            const filteredOldWlist = oldWindowList.data.filter(this.roomNumberCheck);
            await axios.post(apiUrl + "room",roomToSend);

            const newRoomList = await axios.get(apiUrl + "room");
            const roomIdList = newRoomList.data.sort((a,b) => b.id-a.id);
            const newId= roomIdList[0].id;
            for (let i=0; i<this.windowCount;i++){
                let windowToUpdate={"id": null, "name": filteredOldWlist[i].name, "windowStatus": filteredOldWlist[i].windowStatus, "room": roomIdList[0]}
                await axios.post(apiUrl+"windows",windowToUpdate)
            };
            await axios.delete("http://127.0.0.1:8080/api/"+"room/" + id);
            setTimeout(() => this.$router.push('/room/'+newId), 100);
            setTimeout(() => window.location.reload(), 102);
        },
        
        async changeCurrentTemperature(id) {
            if (this.room.targetTemperature=="NO DATA"){
                this.room.targetTemperature = null
            };
            let roomToSend = {
            "buildingId": -10,
            "currentTemperature": this.newCurrentTemperature,
            "floor": JSON.stringify(this.room.floor),
            "id": null,
            "name": this.room.name,
            "targetTemperature": this.room.targetTemperature
            };  
            const apiUrl = "http://127.0.0.1:8080/api/";
            if (this.newCurrentTemperature<0){alert("You should consider heating this place up a little")}
            else if(this.newCurrentTemperature>40){alert("Please get some air conditioning in there")};
            const oldWindowList = await axios.get(apiUrl +"windows");
            const filteredOldWlist = oldWindowList.data.filter(this.roomNumberCheck);
            await axios.post(apiUrl + "room",roomToSend);

            const newRoomList = await axios.get(apiUrl + "room");
            const roomIdList = newRoomList.data.sort((a,b) => b.id-a.id);
            const newId= roomIdList[0].id;
            for (let i=0; i<this.windowCount;i++){
                let windowToUpdate={"id": null, "name": filteredOldWlist[i].name, "windowStatus": filteredOldWlist[i].windowStatus, "room": roomIdList[0]}
                await axios.post(apiUrl+"windows",windowToUpdate)
            };
            await axios.delete("http://127.0.0.1:8080/api/"+"room/" + id);
            setTimeout(() => this.$router.push('/room/'+newId), 100);
            setTimeout(() => window.location.reload(), 102);
        },
        redirectToWindowAdd(){
            this.$router.push('/window-add')
        },
        roomNumberCheck(window){
            return window.room.id == this.$route.params.id
        }


    },
    async created() {
        const apiUrl = "http://127.0.0.1:8080/api/"
        const id = this.$route.params.id
        const response = await axios.get(apiUrl + "room/" + id);
        this.room = replaceNull(response.data);
        const windowList = await axios.get(apiUrl +"windows");
        const filteredWList = windowList.data.filter(this.roomNumberCheck);
        this.windowCount = filteredWList.length;
    }

}


function replaceNull(room) {
    if (room.targetTemperature == null) {
        room.targetTemperature = "NO DATA";
    }
    
    
    if (room.currentTemperature == null) {
        room.currentTemperature = "NO DATA";
    }
    return room;
}
</script>


<style scoped>
div.room-info {
    background-color: rgb(150, 230, 190);
    flex-basis: 50%;
    margin: 10px;
    border-radius: 25px;
    border: 2px solid #73AD21;
    list-style-type: none;
    font-weight: lighter;
}
.container {
    display: flex;
    justify-content: center;
    align-items:center;
    
}

.good-btn {
    background-color: #81a6eb;
    border:  2px solid #0824c4;;
    color: rgb(32, 27, 27);
    padding: 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 5px 4px;
    border-radius: 8px;
}
</style>