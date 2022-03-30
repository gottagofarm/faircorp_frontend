<template>
    <div><br>
        <div class="container">
            <div class="window-info"><br>
                <h4>{{ window.name }}</h4><br>
                <li>room : <span>{{ window.room.name }}</span></li>
                <li>current room temperature : <span>{{ window.room.currentTemperature }}</span></li>
                <li>target room temperature : <span>{{ window.room.targetTemperature }}</span></li><br>
                <li>Status : <span>{{window.windowStatus}}</span> <button @click="switchWindow(window.id)" type="button" class="good-btn" >switch</button> </li><br>
            </div>
        </div>
        <div class="delete the window"> 
                <button @click="deleteWindow(window.id)" type="button" class="btn btn-danger" >Delete window</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            window: []
        }
    },

    
    methods: {
        async deleteWindow(id) {
        /* Find the place of window object with the same Id in the array, and replace it */
            await axios.delete("http://127.0.0.1:8080/api/"+"windows/" + id);
            this.$router.push('/windows-list')
        },
        async switchWindow (id) {
            await axios.put( "http://127.0.0.1:8080/api/"+"windows/" + id +"/switch", id);
            this.$router.push('/windows-list')
        }

    },

    async created() {
        const chemin = "http://127.0.0.1:8080/api/"+"windows/" + this.$route.params.id;
        const response = await axios.get(chemin);
        this.window = replaceNull(response.data);
    }
}


function replaceNull(window) {
    if (window.room.targetTemperature == null) {
        window.room.targetTemperature = "NO DATA";
    }
    else{
        window.room.targetTemperature += " °C"
    }
    if (window.room.currentTemperature == null) {
        window.room.currentTemperature = "NO DATA";
    }
    else{
        window.room.currentTemperature += " °C"
    }
    return window;
}
</script>

<style scoped>

div.window-info {
    background-color: rgb(160, 212, 247);
    flex-basis: 50%;
    margin: 10px;
    border-radius: 25px;
    border: 2px solid #2f67b9;
    list-style-type: none;
    font-weight: lighter;
}
.container {
    display: flex;
    justify-content: center;
    align-items:center;
}
.good-btn {
    background-color: #04AA6D;
    border:  2px solid #148d8d;;
    color: rgb(32, 27, 27);
    padding: 2px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 5px 4px;
    border-radius: 8px;
}
</style>
