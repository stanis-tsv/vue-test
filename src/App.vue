<template>
  <div class="container">
    <TheHeader />
    <div class="menu" :class="{'toggle-menu': $store.state.openMenu}">
      <div class="close-btn">
        <button @click="$store.state.openMenu = !$store.state.openMenu" v-if="$store.getters.windowWidth1080">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <TheNavbar />
      <TheSidebar />
    </div>
    <TheContent />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import TheNavbar from './components/TheNavbar'
import TheContent from './components/TheContent'
import TheSidebar from './components/TheSidebar'

export default {
  components: {TheHeader, TheNavbar, TheContent, TheSidebar},

  methods: {
    onResize() {
      this.$store.state.windowWidth = window.innerWidth
    }
  },

  created() {
    window.addEventListener('resize', this.onResize)
  },
  
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style>
body {
  background: rgb(236, 255, 228);
}
.container {
  max-width: 1080px;
  margin: 0 auto;
}
.close-btn {
  display: none;
}

@media screen and (max-width: 1080px) {
  .container {
    padding: 0 5px;
  }
  .menu {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1;
    transition: .5s;
    height: 100%;
    width: 0;
    top: 0;
    left: -100px;
    background: #414141;
    overflow-x: hidden;
    text-align: center;
  }
  .toggle-menu {
    width: 100%;
    left: 0;
  }
  .n-collapse-item__header-main,
  .n-collapse-item-arrow {
    color: #fff !important;
  }
  .close-btn {
    display: block;
  }
  .close-btn button {
    position: absolute;
    z-index: 324;
    right: 20px;
    top: 15px;
    border: 1px solid #fff;
    color: #fff;
    background: none;
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: .3s;
  }
  .close-btn button:hover {
    opacity: .7;
    transition: .3s;
  }
}
</style>
