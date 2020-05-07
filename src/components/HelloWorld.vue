<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" style="height: 100vh">
      <md-app-toolbar class="md-small" style=" z-index: 10">
        <div class="md-toolbar-row">
          <img src="../assets/testbefund_logo.png" alt="Testbefund Logo">
        </div>
      </md-app-toolbar>
      <md-app-content style="z-index: 0">
        <div v-if="!container">
          <div v-if="!readId">
            Kein Test geladen. Bitte rufen sie www.testbefund.de über den ihnen übergebenen QR-Code auf!
          </div>
          <div v-if="loading" style="display: flex; flex-direction: column">
            Testergbnisse werden geladen...
            <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
          </div>
        </div>
        <TestContainerStatus v-if="!loading && container" :container="container"></TestContainerStatus>
        <md-list class="md-double-line">
          <TestResultItem v-for="test in sortedTests()" :key="test.title" :test="test"></TestResultItem>
        </md-list>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TestbefundClient } from '@/client/TestbefundClient'
import { TestContainerRead } from '@/client/TestContainerRead'
import TestResultItem from '@/components/TestResultItem.vue'
import TestContainerStatus from '@/components/TestContainerStatus.vue'
@Component({
  components: { TestContainerStatus, TestResultItem }
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
</style>
