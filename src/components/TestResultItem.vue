<template>
  <md-list-item>
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
