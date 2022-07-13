<template>
  <form @submit.prevent="createPoll">
    <div class="mb-3">
      <label for="question" class="form-label">Poll Question</label>
      <input
        type="text"
        class="form-control"
        id="question"
        required
        v-model="editable.question"
      />
    </div>
    <div class="input-group mb-3">
      <input
        v-model="answer"
        type="text"
        for="answer"
        class="form-control"
        placeholder="Possible Answer"
      />
      <button
        @click="addAnswer()"
        class="btn btn-outline-secondary"
        type="button"
      >
        Button
      </button>
    </div>
    <div class="input-group mb-3">
      <p class="">
        Answers:
        <span v-for="a in editable.answers" :key="a" class="px-1"
          >"{{ a }}"</span
        >
      </p>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { pollsService } from '../services/PollsService'
export default {
  setup() {
    const editable = ref({ answers: [] })
    let answer = ref('')
    return {
      editable,
      answer,
      addAnswer() {
        editable.value.answers.push(answer.value)
        answer.value = ''
      },
      async createPoll() {
        try {
          if (editable.value.answers.length > 1) {
            await pollsService.create(editable.value)
          }
          else {
            Pop.toast('Please provide at least 2 answers', 'info')
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
</style>