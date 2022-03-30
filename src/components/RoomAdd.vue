<template>


<div class="card mt-5 ">
    <div class="card-header">
        Add a new Room
    </div>
    <div class="card-body">
        <form @submit="submitForm" method="post">
            <div class="form-row"><br>
                <input placeholder="Room Name" class="form-control" type="text" id="roomname" name="roomname" v-model="roomName"><br><br>
                <input placeholder="Floor number" class="form-control" type="text" id="floor" name="floor" v-model="floor"><br><br>
                <input placeholder="Current Temperature (°C)" class="form-control" type="text" id="currentTemperature" name="currentTemperature" v-model="currentTemperature"><br><br>
                <input placeholder="Target Temperature (°C)" class="form-control" type="text" id="targetTemperature" name="targetTemperature" v-model="targetTemperature"><br><br>
                <input type="submit" value="Add">
            </div>
        </form>
    </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'WindowsAddForm',
    props: ["buildings"],
    data: function() {
        return {
            roomName: '',
            currentTemperature: '',
            targetTemperature: '',
            buildingId: '',
            floor:''
        }
    },
    methods: {
        
        submitForm: function(e) {
            e.preventDefault();
            //var number= /^[0-9]\d*$/,
            if (!(!isNaN(this.floor) && parseInt(this.floor) == parseFloat(this.floor))){
                alert("Please enter an integer floor number.")      
            }
            else if (!Number(this.currentTemperature) || !Number(this.targetTemperature)){
                alert("Please enter numbers for the temperature - the temperatures are read in Celsius.")
            }
            else {
                
                let room = {
                "buildingId": -10,
                "currentTemperature": this.currentTemperature,
                "floor": this.floor,
                "id": null,
                "name": this.roomName,
                "targetTemperature": this.targetTemperature
                };
            if (this.floor>99){alert("Don't forget your parachute!")}
            else if (this.floor < -200){alert("Please don't reach ground zero")};
            if (this.targetTemperature>50){alert("Milder temperatures might be more suitable for work")}
            else if(this.targetTemperature>-373 && this.targetTemperature<-10){alert("You might enjoy some frosty coffee")}
            else if(this.targetTemperature<-373){alert("Trying to stop time, are we?")};
            if (this.currentTemperature<0){alert("You should consider heating this place up a little")}
            else if(this.currentTemperature>40){alert("Please get some air conditioning in there")};
            axios.post("http://127.0.0.1:8080/api/" + "room",room);
            
            setTimeout( () => this.$router.push('/rooms-list'), 400);
            
            }
        }
    }
}




</script>

<style>


.card-body {
    background-image : url(https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/12/30/23/web-housing-construction-getty.jpg?width=982&height=726);
    background-size: cover;
}

</style>