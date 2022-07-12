import { dbContext } from "../db/DbContext"

class AnswersService {
  async getAnswersByPollId(pollId) {
    const answers = await dbContext.Answers.find({ pollId })
    return answers
  }

  async create(body) {
    await body.answers.forEach(async a => {
      await dbContext.Answers.create({ pollId: body.id, title: a })
    });
  }

}

export const answersService = new AnswersService()