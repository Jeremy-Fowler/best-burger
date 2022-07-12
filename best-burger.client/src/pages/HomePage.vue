<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-md-6" v-for="p in polls" :key="p.id">
        <Poll :poll="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pollsService } from '../services/PollsService'
import { AppState } from '../AppState'
export default {
  setup() {
    onMounted(async () => {
      try {
        await pollsService.getAll()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      polls: computed(() => AppState.polls)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
