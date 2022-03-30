<template>

    <div>
        <h1><br><br>WELCOME TO YOUR HOMEPAGE<br> (creative title, eh?)</h1>
        
        <p><br>Create and manage your own building!</p>
    
        <p v-if="roomCount>0">You currently have <span>{{ roomCount }}</span> different rooms to manage </p>
        <p v-else>You might want to <a href='http://localhost:8081/room-add'>add some rooms</a> in your building... </p> 
        <p>You also have a total of <span>{{ windowCount }}</span> windows to open or close at will  </p>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            roomCount:'',
            
            windowCount:''

        }
    },
    async created() {
        const apiUrl = "http://127.0.0.1:8080/api/";
        const response = await axios.get(apiUrl + "room");
        this.roomCount = response.data.length;
        const windowRes = await axios.get(apiUrl + "windows");
        this.windowCount = windowRes.data.length;
    }
}
</script>
    
<style scoped>
div * {
    align-content: center;
    vertical-align: middle;
}
</style>
