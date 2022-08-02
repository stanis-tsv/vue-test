<template>
  <div class="nav-container">
    <nav>
      <ul>
        <n-dropdown 
          :trigger="toClick" 
          :options="options"
          @select="handleSelect"
        ><li><a href="#">Усі відео</a></li></n-dropdown>
        <li><a href="#">Документи</a></li>
        <n-dropdown 
          :trigger="toClick" 
          :options="options"
          @select="handleSelect"
        ><li><a href="#">Теми</a></li></n-dropdown>
        <li><a href="#">Автоматизація</a></li>
        <n-dropdown 
          :trigger="toClick" 
          :options="options"
          @select="handleSelect"
        ><li><a href="#">Рубрики</a></li></n-dropdown>
        <li><a href="#">Особистий консультант</a></li>
      </ul>
    </nav>
    <div>
      <button class="pay-btn">Передплатити</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: this.$store.state.sidebarItems
    }
  },
  methods: {
    handleSelect(key) {
      this.$store.state.sidebarFilterItem = this.options.find(i => i.key == key)
      this.$store.state.openMenu = false
    }
  },
  computed: {
    toClick() {
      return this.$store.getters.windowWidth1080 ? 'click' : 'hover'
    }
  }
}
</script>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #414141;
  padding: 0 20px;
  border-radius: 20px;
  margin: 5px 0;
}
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
ul li {
  margin-right: 15px;
  padding: 10px 0;
}
ul li:last-child,
button {
  background: #ed3434;
}
a {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: #f3f3f3;
  transition: .3s;
}
a:hover {
  opacity: .7;
  transition: .3s;
}
button {
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 5px 20px;
  text-transform: uppercase;
  cursor: pointer;
  color: #f3f3f3;
  transition: .3s;
}
button:hover {
  opacity: .7;
  transition: .3s;
} 

@media screen and (max-width: 1080px) {
  .nav-container {
    flex-direction: column;
    width: 100%;
    border-radius: 0;
    margin: 0 auto;
    padding: 0;
  }
  ul {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  ul li {
    text-align: center;
    margin-right: 0;
    border-bottom: 1px solid #f3f3f3;
  }
  ul li:last-child a {
    padding: 0;
  }
  ul li:last-child {
    background: transparent;
  }
  .pay-btn {
    margin: 20px 0;
  }
}
</style>