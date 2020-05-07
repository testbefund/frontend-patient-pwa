<template>
  <div>
    <div style="display: flex; flex-direction: row" v-if="container">
      <img src="../assets/undraw_science_fqhl.svg" alt="laboratory image" style="width: 80px; height: 74px">
      <h2 style="margin-left: 16px">
        Ihr Testergebnis <br/>
        vom {{testDate()}}
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TestContainerRead } from '@/client/TestContainerRead'

    @Component
export default class TestContainerStatus extends Vue {
        @Prop({ required: true })
        container: TestContainerRead;

        testDate () {
          if (this.container) {
            return new Intl.DateTimeFormat(navigator.language).format(new Date(this.container.date))
          }
        }
}
</script>

<style scoped>

</style>
