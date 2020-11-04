<template>
  <div class="hello">
    <h3>My App</h3>
    <h2>{{counter}}</h2>
    <button @click="toggleAutoUpdate">{{started ? 'Stop' : 'Start'}}</button>
    <button @click="fetch">Fetch</button>
    <ul>
      <li v-for="product in products" :key="product.id">{{product.Name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: '',
      counter: 0,
      started: false,
      products: [],
    };
  },
  created() {
    this.updatePage();
    this.startAutoUpdate();
  },
  methods: {
    fetch() {
      window.ipcRenderer.invoke('query', 'SELECT top 10 * from Production.Product')
         .then((p)=> {
           this.products = p.recordset;
         })
         .catch(e => console.log('ERROR: ', e));
    },
    updatePage() {
      this.counter++;
    },
    toggleAutoUpdate() {
      if (this.started) {
        this.cancelAutoUpdate();
      } else {
        this.startAutoUpdate();
      }
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
      this.started = false;
    },
    startAutoUpdate() {
        this.timer = setInterval(this.updatePage, 5 * 1000); // five seconds
      //this.timer = setInterval(this.updatePage, 5 * 60 * 1000); // five minutes
      this.started = true;
    },
  },
  beforeUnmount() {
    this.cancelAutoUpdate();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
