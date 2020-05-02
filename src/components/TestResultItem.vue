<template>
  <md-list-item>
    <md-dialog :md-active.sync="infoOpen">
      <md-dialog-title>Test Ausgestellt durch {{test.client.name}}</md-dialog-title>
      <md-content style="padding: 0 24px 0">
        <p>
          Informationen zur Teststelle:<br/>
          <span style="white-space: pre">{{test.client.name}}<br/>{{test.client.address}}</span>
        </p>
        <p>
          Der Test wurde ausgestellt durch {{test.client.name}}. Wenn sie nach bekanntwerden ihres Ergebnisses Redebarf
          haben, melden sich sich gerne
          unter <a :href="'tel:' + test.client.telefon" target="_blank">{{test.client.telefon}}</a> (Erreichbar
          {{test.client.openingHours}}).
        </p>
        <p>
          Sie können uns auch im Internet unter <a :href="test.client.homepage"
                                                   target="_blank">{{test.client.homepage}}</a> finden.
        </p>
        <div>
          <md-button class="md-fab" :href="'tel:' + test.client.telefon">
            <md-icon>phone</md-icon>
          </md-button>
          <md-button class="md-fab" :href="test.client.homepage" target="_blank">
            <md-icon>language</md-icon>
          </md-button>
        </div>
      </md-content>
      <md-dialog-actions>

        <md-button class="md-primary" @click="infoOpen = false">Schließen</md-button>

      </md-dialog-actions>
    </md-dialog>
    <div class="md-list-item-text">
      <span>{{test.title}} ({{test.icd_code}})</span>
      <span>{{renderTestResult()}}</span>
    </div>
    <md-button class="md-icon-button md-list-action" v-if="test.client" @click="infoOpen = true">
      <md-icon>contact_phone</md-icon>
    </md-button>
  </md-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { TestCaseRead } from '@/client/TestCaseRead'

    @Component
export default class TestResultItem extends Vue {
        @Prop({ required: true })
        test: TestCaseRead

        infoOpen = false;

        private renderTestStatus () {
          if (this.test.status === 'IN_PROGRESS') {
            return 'Test In Bearbeitung'
          }
          if (this.test.status === 'REVIEW_PENDING') {
            return 'Testergebnis wird geprüft'
          }
          return this.test.status
        }

        renderTestResult () {
          if (this.test.status === 'DONE') {
            if (this.test.infected === 'POSITIVE') {
              return 'Testbefund: Positiv'
            }
            if (this.test.infected === 'NEGATIVE') {
              return 'Testbefund: Negativ'
            }
            return this.test.infected
          }
          return this.renderTestStatus()
        }
}
</script>

<style scoped>

</style>
