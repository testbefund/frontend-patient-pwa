<template>
  <md-dialog v-if="client" :md-fullscreen="false" :md-active="open" @close="close()" class="client-info-card-container">
    <md-dialog-title class="primary-colored">Kontakt</md-dialog-title>
    <md-content style="padding: 0 24px 0">
      <p>
        Der Test wurde ausgestellt durch:
      </p>
      <p>
        <span><strong>{{client.name}}</strong></span><br/>
        <span style="white-space: pre">{{client.address}}</span>
      </p>

      <p>
        Wenn sie nach bekanntwerden ihres Ergebnisses Redebarf haben, melden sich sich gerne
        unter <a :href="'tel:' + client.telefon" target="_blank">{{client.telefon}}</a> (Erreichbar
        {{client.openingHours}}).
      </p>
      <p>
        Sie können uns auch im Internet unter <a :href="hompageUrl()"
                                                 target="_blank">{{homepageName()}}</a> finden.
      </p>
      <div>
        <md-button class="md-icon-button md-raised" :href="'tel:' + client.telefon">
          <md-icon class="primary-colored">phone</md-icon>
        </md-button>
        <md-button class="md-icon-button md-raised" :href="hompageUrl()" target="_blank">
          <md-icon class="primary-colored">language</md-icon>
        </md-button>
      </div>
    </md-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="close()">Schließen</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { TestCaseClient } from '@/client/TestCaseClient'

    @Component
export default class TestIssuerDialog extends Vue {
        @Prop({ required: true })
        client: TestCaseClient;

        @Prop({ required: false })
        open: boolean;

        @Emit('close')
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        close () { }

        homepageName () {
          return this.client.homepage
        }

        hompageUrl () {
          if (this.client.homepage.startsWith('http')) {
            return this.client.homepage
          }
          // Workaround in case client forgot to enter http://; Makes links works
          return `https://${this.client.homepage}`
        }
}
</script>

<style scoped  lang="scss">
  @import "../variables";

  .client-info-card-container {
    border-radius: 25px;
  }

  .primary-colored {
    color: $primary !important;
  }
</style>
