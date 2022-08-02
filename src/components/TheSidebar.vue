<template>
  <div class="sidebar">
    <n-collapse default-expanded-names="1" accordion>
      <n-collapse-item class="item" title="Відео" name="1">
        <a 
          href="#" 
          @click="sbClick(item)" 
          v-for="item in sidebarItems" 
          :key="item.key"
        >{{ item.label }} ({{ item.count }})</a>
      </n-collapse-item>
      <n-collapse-item class="item" title="Теми" name="2">
        <a 
          href="#" 
          @click="$store.state.sidebarFilterItem = item" 
          v-for="item in sidebarItems" 
          :key="item.key"
        >{{ item.label }} ({{ item.count }})</a>
      </n-collapse-item>
      <n-collapse-item class="item" title="Рубрики" name="3">
        <a 
          href="#" 
          @click="$store.state.sidebarFilterItem = item" 
          v-for="item in sidebarItems" 
          :key="item.key"
        >{{ item.label }} ({{ item.count }})</a>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItems: this.$store.state.sidebarItems
    }
  },
  methods: {
    sbClick(item) {
      this.$store.state.sidebarFilterItem = item
      this.$store.state.openMenu = false
    }
  }
}
</script>

<style scoped>
.sidebar {
  position: absolute;
  width: 170px;
  border: 1px solid #414141;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 20px 5px 0;
}
a {
  display: flex;
  font-size: 16px;
  cursor: pointer;
  color: #414141;
  text-decoration: none;
  transition: .3s;
}
a:hover {
  opacity: .7;
  transition: .3s;
}

@media screen and (max-width: 1080px) {
  .sidebar {
    position: relative;
    width: 50%;
    border-radius: 0;
    margin: 3px auto 0;
    background: #414141;
    border-top: 1px solid #fff;
  }
  a {
    color: #fff;
    display: flex;
    justify-content: center;
  }
}
</style>