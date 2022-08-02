import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      items: [],
      search: '',
      windowWidth: window.innerWidth,
      sidebarFilterItem: null,
      openMenu: false,
      dropdownOptions: [
        {
          label: 'Спочатку нові',
          key: 'new'
        }, 
        {
          label: 'Спочатку старі',
          key: 'old'
        },
        {
          label: 'Популярні',
          key: 'popular'
        }
      ],
      sidebarItems: [
        {
          label: 'Усі відео',
          key: 'all_videos',
          count: 0
        },
        {
          label: 'Відрядження',
          key: 'business_trips',
          count: 0
        },
        {
          label: 'Валюта',
          key: 'currency',
          count: 0
        },
        {
          label: 'Виробництво',
          key: 'production',
          count: 0
        },
        {
          label: 'Відпустка',
          key: 'vacation',
          count: 0
        },
        {
          label: 'Акцизний податок',
          key: 'excise_tax',
          count: 0
        }
      ]
    }
  },

  getters: {
    windowWidth1080(state) {
      return state.windowWidth <= 1080 ? true : false
    },
    windowWidth700(state) {
      return state.windowWidth <= 700 ? true : false
    }
  },

  mutations: {
    itemsCounter(state) {
      state.sidebarItems.forEach(item => 
        item.count = item.key === 'all_videos' 
          ? state.items.length 
          : state.items.filter(i => i.theme === item.key).length
      )
    },

  },

  actions: {
    async loadItems({state}) {
      const res = await fetch('./data.json')
      state.items = await res.json()
    }
  },
  
  modules: {
  }
})
