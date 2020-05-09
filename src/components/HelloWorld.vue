<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed" style="height: calc(100vh - 56px)">
      <md-app-toolbar class="md-small" style=" z-index: 10">
        <div class="md-toolbar-row">
          <img src="../assets/testbefund_logo.png" alt="Testbefund Logo">
        </div>
      </md-app-toolbar>
      <md-app-content style="z-index: 0">
        <md-dialog v-if="container && container.client" :md-active.sync="infoOpen">
          <md-dialog-title>Test Ausgestellt durch {{container.client.name}}</md-dialog-title>
          <md-content style="padding: 0 24px 0">
            <p>
              Informationen zur Teststelle:<br/>
              <span style="white-space: pre">{{container.client.name}}<br/>{{container.client.address}}</span>
            </p>
            <p>
              Der Test wurde ausgestellt durch {{container.client.name}}. Wenn sie nach bekanntwerden ihres Ergebnisses Redebarf
              haben, melden sich sich gerne
              unter <a :href="'tel:' + container.client.telefon" target="_blank">{{container.client.telefon}}</a> (Erreichbar
              {{container.client.openingHours}}).
            </p>
            <p>
              Sie können uns auch im Internet unter <a :href="container.client.homepage"
                                                       target="_blank">{{container.client.homepage}}</a> finden.
            </p>
            <div>
              <md-button class="md-fab" :href="'tel:' + container.client.telefon">
                <md-icon>phone</md-icon>
              </md-button>
              <md-button class="md-fab" :href="container.client.homepage" target="_blank">
                <md-icon>language</md-icon>
              </md-button>
            </div>
          </md-content>
          <md-dialog-actions>
            <md-button class="md-primary" @click="infoOpen = false">Schließen</md-button>
          </md-dialog-actions>
        </md-dialog>
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
    <md-bottom-bar style="height: 56px;">
      <md-bottom-bar-item @click="infoOpen = true" md-label="Kontakt" md-icon="contact_phone"></md-bottom-bar-item>
    </md-bottom-bar>
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
        container: TestContainerRead | null = null
        readId: string | null = ''
        loading = false
        infoOpen = false

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

<style>
  .md-bottom-bar>.md-ripple {
    align-items: center !important;
    justify-content: center !important;
  }
</style>
