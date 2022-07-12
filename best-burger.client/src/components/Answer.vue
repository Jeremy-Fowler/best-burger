<template>
  <div
    @click="createVote()"
    class="
      bg-light
      shadow
      border border-2
      rounded
      p-3
      d-flex
      justify-content-between
      selectable
    "
    :class="{ 'border-success': foundVote, 'border-dark': !foundVote }"
  >
    <div>{{ answer.title }}</div>
    <div>Votes: {{ votes.length }}</div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { votesService } from '../services/VotesService'
export default {
  props: {
    answer: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      votes: computed(() => AppState.votes.filter(v => v.answerId == props.answer.id)),
      foundVote: computed(() => AppState.votes.find(v => v.answerId == props.answer.id && v.accountId == AppState.account.id)),
      async createVote() {
        try {
          if (!AppState.account.id) {
            Pop.toast("Please log in to vote", 'error')
          }
          else if (this.foundVote) {
            Pop.toast("You've already voted for this option", 'info')
          }
          else {
            const body = {
              answerId: props.answer.id,
              pollId: props.answer.pollId
            }
            await votesService.create(body)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
* {
  font-size: 24px;
}
</style>