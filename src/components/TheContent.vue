<template>
  <div class="content">
    <div class="content-header">
      <button class="menu-btn" @click="$store.state.openMenu = !$store.state.openMenu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <h1>{{ headerTitle }}</h1>
      <div class="sort">
        <n-dropdown class="dropdown" 
          trigger="click" 
          :options="options" 
          @select="handleSelect"
        >
          <button class="dropdown-btn">Сортувати</button>
        </n-dropdown>
        <button 
          class="view-btn" 
          v-if="!$store.getters.windowWidth700"
          :class="{'view-btn-active': cardsView}" 
          @click="cardsView = true"
        >
          <i class="fa-solid fa-grip"></i>
        </button>
        <button 
          class="view-btn" 
          v-if="!$store.getters.windowWidth700"
          :class="{'view-btn-active': !cardsView}" 
          @click="cardsView = false"
        >
          <i class="fa-solid fa-list"></i>
        </button>
      </div>
    </div>
    <div class="items-container">
      <div class="items">
        <div 
          :class="{'width100': !cardsView}" 
          v-for="item in itemList" 
          :key="item.id"
        >
          <ItemCard :item="item" :cardsView="cardsView" />
        </div>
      </div>
      <div class="pagination-section">
        <button 
          class="load-more" 
          @click="loadMore" 
          v-if="perPage < itemCount"
        >Показати ще</button>
        <n-pagination 
          v-model:page="page" 
          :page-size="perPage" 
          :item-count="itemCount" 
          @update:page="changedPage"
          class="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ItemCard from './ItemCard'

export default {
  components: {ItemCard},
  data() {
    return {
      fItems: null,
      itemList: null,
      headerTitle: this.$store.state.sidebarItems[0].label,
      isSorted: false,
      isFiltered: false,
      page: 1,
      perPage: 6,
      itemCount: null,
      cardsView: true 
    }
  },

  methods: {
    createItemList(per, curr) {
      this.itemCount = (this.isFiltered && this.isSorted) || (this.isFiltered && !this.isSorted) || (this.isSorted && !this.isFiltered) 
        ? this.fItems.length 
        : this.items.length

      this.itemList = (this.isFiltered && this.isSorted) || (this.isFiltered && !this.isSorted) || (this.isSorted && !this.isFiltered) 
        ? this.fItems.slice(curr * per, (curr + 1) * per) 
        : this.items.slice(curr * per, (curr + 1) * per)
    },

    // pagination
    changedPage(page) {
      this.createItemList(this.perPage, page - 1)
    },

    loadMore() {
      if (this.isSorted) {
        this.itemList = this.fItems.slice(0, this.perPage += 6)
      } else {
        this.itemList = this.items.slice(0, this.perPage += 6)
      }
    },

    // sorting
    handleSelect(key) { 
      if (key === 'new') {
        this.fItems = this.isFiltered 
          ? this.fItems.sort((a,b) => new Date(b.date) - new Date(a.date)) 
          : this.items.sort((a,b) => new Date(b.date) - new Date(a.date))
      }
      if (key === 'old') {
        this.fItems = this.isFiltered 
          ? this.fItems.sort((a,b) => new Date(a.date) - new Date(b.date)) 
          : this.items.sort((a,b) => new Date(a.date) - new Date(b.date))
      }
      if (key === 'popular') {
        this.fItems = this.isFiltered 
          ? this.fItems.filter(i => i.options.popular) 
          : this.items.filter(i => i.options.popular)
      }
      this.isSorted = true
      this.createItemList(this.perPage, 0)
    },

    sidebarFilter() {
      this.headerTitle = this.sbFilterItem.label
      this.fItems = this.sbFilterItem.key === 'all_videos' 
        ? this.items 
        : this.items.filter(i => i.theme === this.sbFilterItem.key)
      this.isFiltered = true
      this.createItemList(this.perPage, 0)
    }
  },

  computed: {
    items() {
      return this.$store.state.items
    },
    search() {
      return this.$store.state.search
    },
    options() {
      return this.$store.state.dropdownOptions
    },
    dropdownFilter() {
      return this.$store.state.dropdownFilter
    },
    sbFilterItem() {
      return this.$store.state.sidebarFilterItem
    },
    width700() {
      return this.$store.getters.windowWidth700
    }
  },

  async mounted() {
    await this.$store.dispatch('loadItems')
    this.createItemList(this.perPage, 0)
    this.$store.commit('itemsCounter')
  },

  watch: {
    search(value) {
      this.itemList = this.items.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    },

    sbFilterItem(value) {
      if (value !== null) {
        this.sidebarFilter()
      }
    },

    width700(value) {
      if(value) {
        this.cardsView = true
      }
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  width: 830px;
  margin-left: 230px;
}
.content-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 20px;
  border-bottom: 1px solid #414141;
  color: #414141;
}
h1 {
  color: #414141;
  margin: 0;
}
.sort {
  display: flex;
}
.sort button {
  display: flex;
  align-self: flex-end;
  border: 1px solid #414141;
  background: none;
  border-radius: 10px;
  margin-right: 5px;
  padding: 5px 20px;
  cursor: pointer;
  transition: .3s;
}
.sort .view-btn {
  padding: 5px;
}
.sort .view-btn-active {
  color: #ed3434;
  border-color: #ed3434;
}
i {
  font-size: 16px;
}
.sort button:hover {
  opacity: .7;
  transition: .3s;
} 
.items-container {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
}
.items {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.pagination-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0 20px;
}
.load-more {
  border: 1px solid #414141;
  background: none;
  border-radius: 10px;
  padding: 5px 20px;
  text-transform: uppercase;
  cursor: pointer;
  transition: .3s;
}
.load-more:hover {
  opacity: .7;
  transition: .3s;
}
.menu-btn {
  display: none;
}
/* add for list cards view */
.width100 {
  width: 100%;
}
/*  */

@media screen and (max-width: 1080px) {
  .content {
    width: 100%;
    margin-left: 0;
  }
  .content-header {
    align-items: center;
  }
  .items {
    justify-content: space-around;
  }
  .menu-btn {
    display: block;
    border: 1px solid #414141;
    background: none;
    border-radius: 10px;
    padding: 10px;
    cursor: pointer;
    transition: .3s;
  }
  .menu-btn:hover {
    opacity: .7;
    transition: .3s;
  }
}

@media screen and (max-width: 700px) {
  .pagination-section {
    flex-direction: column;
  }
  .load-more {
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 450px) {
  .content-header {
    flex-wrap: wrap;
    padding-bottom: 10px;
  }
  h1 {
    flex-basis: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
  .menu-btn {
    order: 1;
    align-self: center;
    padding: 10px;
  }
  .sort {
    order: 2;
    align-self: center;
  }
}
</style>