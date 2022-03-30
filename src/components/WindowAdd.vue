<template>
    <div class="card mt-5 mb-5">
        <div class="card-header">
            Add a new Window
        </div>
        <div class="card-body">
            <form @submit="submitForm" method="post">
                <div class="form-row">
                    <br><input placeholder="Window Name" class="form-control" type="text" id="windowname" name="windowname" v-model="windowName"><br><br>
                    
                    <select class="form-control" name="names" id="roomName" v-model="roomId">
                        <option value="" disabled>Select a Room...</option>
                        <option v-for="room in rooms" :room="room" :key="room.id" :value="room.id">{{room.name}}</option>
                    </select><br><br>
                    
                    <select class="form-control" name="names" id="windowStatus" v-model="windowStatus">
                        <option value="" disabled>Select a window status...</option>
                        <option value ="OPEN" selected="selected">OPEN</option>
                        <option value="CLOSED">CLOSED</option>
                    </select><br><br>

                    <input type="submit" value="Add">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'WindowsAdd',
    data: function() {
        return {
            windowName: '',
            roomId: '',
            windowStatus: '',
            rooms: [],
        }
    },
    methods: {
        submitForm: function(e) {
            e.preventDefault();
            let window = { "id": null, "name": this.windowName, "windowStatus": this.windowStatus, "room": this.rooms.filter((room)=>room.id===this.roomId)[0] };
            axios.post("http://127.0.0.1:8080/api/" + "windows",window)
        }
    },
    created: async function () {
        const apiUrl = "http://127.0.0.1:8080/api/"
        const response = await axios.get(apiUrl + "room");
        this.rooms= response.data
    }
}
</script>

<style>


.card-body {
    background-image : url(https://images.techhive.com/images/article/2015/09/thinkstockphotos-482247865-100611735-large.jpg);
    background-size: cover;
}

</style>