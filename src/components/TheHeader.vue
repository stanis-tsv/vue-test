<template>
  <div class="row">
    <div class="logo">LOGO.COM</div>
    <div class="search">
      <input type="search" placeholder="Пошук відео" class="search" v-model="$store.state.search" />
    </div>
    <div class="email">
      <a href="#">
        <img class="email-icon" src="../assets/email-icon.png" alt="email">
        <span v-if="!$store.getters.windowWidth700">person@gmail.com</span>
      </a>
      <a href="#" v-if="!$store.getters.windowWidth700">
        <img class="notification-icon" src="../assets/notification-icon.png" alt="notification">
      </a>
    </div>
      
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #232323;
  padding: 5px 20px;
  border-radius: 20px;
  margin: 5px 0;
}
.logo {
  font-size: 25px;
  color: rgb(236, 255, 228);
}
.search {
  display: flex;
  justify-content: center;
  width: 100%;
}
.search input {
  width: 80%;
  height: 30px;
  outline: none;
  font-size: 18px;
  border: none;
  border-radius: 20px;
  padding-left: 10px;
}
.search input:focus::placeholder {
  color: transparent;
}
.email {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.email a {
  display: flex;
  align-items: center;
}
.email-icon {
  width: 16px;
  height: 16px;
}
.email span {
  margin: 0 30px 0 5px;
}
.notification-icon {
  width: 24px;
  height: 24px;
}
a {
  cursor: pointer;
  color: #f3f3f3;
  text-decoration: none;
  transition: .3s;
}
a:hover {
  opacity: .7;
  transition: .3s;
}

@media screen and (max-width: 700px) {
  .logo {
    font-size: 20px;
  }
  .search input {
    width: 100%;
    margin: 0 10px;
  }
}
</style>