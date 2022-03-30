<template>
<nav class="navbar d-print navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">
      <img src="@/assets/building.png" width="80" height="50" alt="building logo">
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/windows-list">Windows</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/rooms-list">Rooms</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/room-add">Add Room</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/window-add">Add Window</a>
      </li>
    </ul>
  </div>
</nav>
</template>

<style scoped>

a.navbar-brand img {
    padding-left: 10px;
}

</style>