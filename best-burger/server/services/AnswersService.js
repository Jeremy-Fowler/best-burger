import { dbContext } from "../db/DbContext"

class AnswersService {
  async getAnswersByPollId(pollId) {
    const answers = await dbContext.Answers.find({ pollId })
    return answers
  }

  async create(body) {
    body.answers.forEach(async a => {
      await dbContext.Answers.create({ pollId: body.id, title: a.title })
    });
  }

}

export const answersService = new AnswersService()