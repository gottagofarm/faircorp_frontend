<template>
    <div class= "container">
        <div v-for="room in rooms" :key="room.id" class="room-info" v-on:click="redirectToRoom(room.id)" style="cursor: pointer;">
            <h4>{{ room.name }}</h4>
            <li>Floor : <span>{{ room.floor }}</span></li>
            <li>Current temperature : <span>{{ room.currentTemperature }} °C</span></li>
            <li>Target temperature : <span>{{ room.targetTemperature }} °C</span></li>
		</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            rooms: []
        }
    },
    methods:{
        redirectToRoom(id){
            this.$router.push('/room/' + id); 
        }
    },
    async created() {
        const apiUrl = "http://127.0.0.1:8080/api/"
        const response = await axios.get(apiUrl + "room");
        const sortRes = replaceNull(response.data);
        this.rooms = sortRes.sort((a,b) => a.floor-b.floor); 
        //sorting the rooms by floor so you don't randomly have to search through 80 different rooms
    }   
}

function replaceNull(rooms) {
    for (var i=0; i<rooms.length; i++) {
        if (rooms[i].targetTemperature == null) {
            rooms[i].targetTemperature = "NO DATA";
        }
    
        if (rooms[i].currentTemperature == null) {
            rooms[i].currentTemperature = "NO DATA";
        }
    
    }
    return rooms;
}

</script>

<style scoped>
div.room-info {
    background-color: rgb(150, 230, 190);
    flex-basis: 47%;
    margin: 10px;
    align-content: center;
    border-radius: 25px;
    border: 2px solid #73AD21;
    list-style-type: none;
}


.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

</style>
