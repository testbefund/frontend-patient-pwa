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
      <div v-if="loading">
        Testergbnisse werden geladen...
        <md-progress-spinner :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
      </div>
      <div v-if="container" style="display: flex; flex-direction: column">
        <h4>Übersicht ihrer Testergebnisse</h4>
        <div style="display: flex; flex-direction: column; margin-bottom: 8px">
          <span>In Bearbeitung: {{inProgressCount()}} / {{totalCount()}}</span>
          <span>In Prüfung: {{reviewPendingCount()}} / {{totalCount()}}</span>
          <span> Ergebnis vorhanden: {{doneCount()}} / {{totalCount()}}</span>
        </div>
        <div v-for="test in container.tests" :key="test.title">
          <div>
            <span>Testergebnis für </span><span class="test-title">{{test.title}}:</span>
            <span> {{ renderTestResult(test)}}</span>
          </div>
        </div>
      </div>

    </md-app-content>
  </md-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TestbefundClient } from '@/client/TestbefundClient'
import { TestContainerRead } from '@/client/TestContainerRead'
import { TestCaseRead } from '@/client/TestCaseRead'

    @Component
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

        private renderTestStatus (status: string) {
          if (status === 'IN_PROGRESS') {
            return 'In Bearbeitung'
          }
          if (status === 'REVIEW_PENDING') {
            return 'Ergebnis wird geprüft'
          }
          return status
        }

        renderTestResult (test: TestCaseRead) {
          if (test.status === 'DONE') {
            if (test.infected === 'POSITIVE') {
              return 'Positiv'
            }
            if (test.infected === 'NEGATIVE') {
              return 'Negativ'
            }
            return test.infected
          }
          return this.renderTestStatus(test.status)
        }

        @Watch('$route')
        onPropertyChanged () {
          this.fetchData()
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .test-title {
    font-weight: bold;
  }
</style>
