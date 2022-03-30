<template>
    <div class= "container">
        <div v-for="window in windows" :key="window.id" class="window-info" v-on:click="redirectToWindow(window.id)" style="cursor: pointer;">
            <h4>{{ window.name }}</h4>
            <li>Room : <span>{{ window.room.name }}</span></li>
            <li>Current room temperature : <span>{{ window.room.currentTemperature }}</span></li>
            <li>Target room temperature : <span>{{ window.room.targetTemperature }}</span></li>
            <li>Status : <span>{{window.windowStatus}}</span></li>
            
		</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            windows: []
        }
    },
    methods:{
        redirectToWindow(id){
            this.$router.push('/window/' + id); 
        }
    },
    async created() {
        const apiUrl = "http://127.0.0.1:8080/api/"
        const response = await axios.get(apiUrl + "windows");
        const sortRes = replaceNull(response.data);
        this.windows = sortRes.sort((a,b) => a.room.id-b.room.id); 
        //grouping the windows by room so it makes at least some sense, also makes it easier if you know the room name or id
    }
}

function replaceNull(windows) {
    for (var i=0; i<windows.length; i++) {
        if (windows[i].room.targetTemperature == null) {
            windows[i].room.targetTemperature = "NO DATA";
        }
        else{
            windows[i].room.targetTemperature += " °C"
        }
        if (windows[i].room.currentTemperature == null) {
            windows[i].room.currentTemperature = "NO DATA";
        }
        else{
            windows[i].room.currentTemperature += " °C"
        }
    }
    return windows;
}
</script>

<style scoped>
div.window-info {
    background-color: rgb(160, 212, 247);
    flex-basis: 47%;
    margin: 10px;
    border-radius: 25px;
    border: 2px solid #2f67b9;
    list-style-type: none;
}


.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

</style>
