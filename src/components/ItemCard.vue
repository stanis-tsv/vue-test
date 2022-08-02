<template>
  <div class="item-card" :class="{'item-card-list': !cardsView}">
    <img class="item-cover" :src="item.covers.main" :alt="item.id" />
    <div class="card-info" :class="{'card-info-list': !cardsView}">
      <div :class="{'date-title-rate': !cardsView}">
        <span class="date">{{ date }}</span>
        <div class="title">
          <strong>{{ item.title }}</strong>
        </div>
        <div class="rate">
          <span class="rate-val">{{ val }}</span>
          <n-rate @update:value="rateValue" class="n-rate" />
          <span>({{ votes }})</span>
        </div>
      </div>
      <div class="card-btn" :class="{'card-btn-list': !cardsView}">
        <button :disabled="!item.access"></button>
        <span class="fav-icon" @click="favActive = !favActive">
          <i class="fa-regular fa-heart" v-if="!favActive"></i>
          <i class="fa-solid fa-heart" v-else></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'cardsView'],
  data() {
    return {
      date: new Date(this.item.date).toLocaleDateString('ua-UA', {day: 'numeric', month: 'long', year: 'numeric'}),
      val: 0,
      votes: 42,
      favActive: false
    }
  },
  methods: {
    rateValue(value) {
      this.val = value
    }
  }
}
</script>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  width: 250px;
  color: #414141;
  border-radius: 20px;
  overflow: hidden;
}
.item-card:hover .item-cover {
  opacity: .7;
  transition: .3s
}
.item-cover {
  width: 255px;
  height: 240px;
  transition: .3s
}
.card-info {
  display: flex;
  flex-direction: column;
  border: 1px solid #414141;
  border-top: none;
  border-radius: 0 0 20px 20px;
  padding: 5px 10px 15px;
  text-align: center;
}
.date {
  font-size: 12px;
  color: #ed3434;
}
.title {
  height: 70px;
  margin-bottom: 5px;
  font-size: 16px;
}
.rate {
  display: flex;
  justify-content: center;
  align-items: center;
}
.rate-val {
  font-size: 18px;
}
.n-rate {
  margin: 0 10px;
  width: 120px;
}
.card-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-btn button {
  width: 180px;
  height: 34px;
  border: none;
  margin-right: 20px;
  background: url('../assets/btn.png');
  transition: .3s;
  cursor: pointer;
}
.card-btn button:hover,
.card-btn button:active,
.card-btn button:focus {
  background: url('../assets/btn-active.png');
  transition: .3s;
}
.card-btn button:disabled {
  background: url('../assets/btn-disabled.png');
  cursor: default;
}
.fav-icon {
  display: flex;
  align-self: center;
}
.fav-icon i {
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  color: #ed3434;
}

/* list card view */
.item-card-list {
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-radius: 20px;
  padding-bottom: 0;
}
.card-info-list {
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #414141;
  border-radius: 0 20px 20px 0;
  border-left: none;
  flex: 1;
  text-align: left;
}
.date-title-rate {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}
.card-btn-list {
  flex-direction: column;
  gap: 20px;
}
/*  */
</style>