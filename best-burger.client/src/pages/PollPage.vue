<template>
  <div v-if="poll" class="container-fluid">
    <div class="row mt-3">
      <div class="col-8 ps-3">
        <p class="question">{{ poll.question }}</p>
      </div>
      <div class="col-4">
        <img :src="poll.creator.picture" alt="" class="img-fluid" />
        <p>{{ poll.creator.name }}</p>
      </div>
    </div>
    <div class="row mt-5 px-3">
      <div class="col-md-6 mb-3" v-for="a in answers" :key="a.id">
        <Answer :answer="a" />
      </div>
    </div>
  </div>
  <div v-else class="container-fluid">
    <div class="row justify-content-center mt-5">
      <div class="col text-center load">
        <i class="mdi mdi-loading mdi-spin"></i>
      </div>
      <div class="col text-center load">
        <i class="mdi mdi-loading mdi-spin"></i>
      </div>
      <div class="col text-center load">
        <i class="mdi mdi-loading mdi-spin"></i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pollsService } from '../services/PollsService'
import { answersService } from '../services/AnswersService'
import { votesService } from '../services/VotesService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { socketService } from '../services/SocketService'
export default {

  setup() {
    const route = useRoute()
    watchEffect(async () => {
      if (route.params.id) {
        try {
          pollsService.clear()
          await pollsService.getById(route.params.id)
          await answersService.getAnswersByPollId(route.params.id)
          await votesService.getVotesByPollId(route.params.id)
          socketService.joinRoom(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    })
    return {
      poll: computed(() => AppState.activePoll),
      answers: computed(() => AppState.answers)
    }
  }
}
</script>


<style lang="scss" scoped>
.load {
  font-size: 10vh;
}
.question {
  font-size: 36px;
}
</style>