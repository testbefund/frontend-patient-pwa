<template>
  <md-app md-waterfall md-mode="overlap">
    <md-app-toolbar class="md-primary md-large">
      <div class="md-toolbar-row">
        <img src="../assets/testbefund_logo.png" alt="Testbefund Logo" style="margin-top: 24px">
      </div>
    </md-app-toolbar>
    <md-app-content style="height: 80vh">
      <div v-if="!readId">
        Kein Test geladen. Bitte rufen sie www.testbefund.de über den ihnen übergebenen QR-Code auf!
      </div>
      <div v-if="loading" style="display: flex; flex-direction: column">
        Testergbnisse werden geladen...
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
      </div>
      <div v-if="container" style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: row">
          <img src="../assets/undraw_science_fqhl.svg" alt="laboratory image" style="width: 80px; height: auto">
          <h2 style="margin-left: 16px">
            Ihr Testergebnis <br/>
            vom {{testDate()}}
          </h2>
        </div>
        <md-list class="md-double-line md-scrollbar" style="max-height: 65vh; overflow: auto">
            <TestResultItem v-for="test in sortedTests()" :key="test.title" :test="test"></TestResultItem>
        </md-list>
      </div>
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TestbefundClient } from '@/client/TestbefundClient'
import { TestContainerRead } from '@/client/TestContainerRead'
import TestResultItem from '@/components/TestResultItem.vue'
@Component({
  components: { TestResultItem }
})
export default class HelloWorld extends Vue {
        container: TestContainerRead | null = null;
        readId: string | null = ''
        loading = false

        fetchData () {
          this.container = null

          const readId = this.$route.query.readId
          if (readId != null && typeof readId === 'string') {
            this.readId = readId
            this.loading = true
            new TestbefundClient().getContainerByReadId(readId)
              .then(container => {
                this.container = container
                this.loading = false
              })
          }
        }

        inProgressCount () {
          return this.container?.tests.filter(test => test.status === 'IN_PROGRESS').length
        }

        reviewPendingCount () {
          return this.container?.tests.filter(test => test.status === 'REVIEW_PENDING').length
        }

        doneCount () {
          return this.container?.tests.filter(test => test.status === 'DONE').length
        }

        totalCount () {
          return this.container?.tests.length
        }

        created (): void {
          this.fetchData()
        }

        @Watch('$route')
        onPropertyChanged () {
          this.fetchData()
        }

        testDate () {
          if (this.container) {
            return new Intl.DateTimeFormat(navigator.language).format(new Date(this.container.date))
          }
        }

        sortedTests () {
          if (this.container) {
            return [...this.container.tests].sort((t1, t2) => t1.title.localeCompare(t2.title))
          }
          return []
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test-title {
    font-weight: bold;
  }
</style>
