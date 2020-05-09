<template>
  <md-list-item>
    <div class="md-list-item-text">
      <div class="test-status-container">
        <span>{{test.title}} ({{test.icd_code}})</span>
        <span class="test-result-text">{{renderTestResult()}}</span>
      </div>

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
            return 'In Bearbeitung'
          }
          if (this.test.status === 'REVIEW_PENDING') {
            return 'Wird geprüft'
          }
          return this.test.status
        }

        renderTestResult () {
          if (this.test.status === 'DONE') {
            if (this.test.infected === 'POSITIVE') {
              return 'Positiv'
            }
            if (this.test.infected === 'NEGATIVE') {
              return 'Negativ'
            }
            return this.test.infected
          }
          return this.renderTestStatus()
        }
}
</script>

<style scoped>

  .test-result-text {
    text-align: right; margin-right: 8px
  }

  .test-status-container {
    display: flex;
  }

</style>
