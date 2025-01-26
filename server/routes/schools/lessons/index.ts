import LessonsModel from "~~/model/Lessons.model";
import response from "~~/utils/response";

export default eventHandler({
  onRequest: [],
  async handler(event) {
    const lessons = await LessonsModel.find({})
      .populate("course")
      .populate("school");
    return response.success(event, {
      message: "Successfully created",
      data: lessons,
    });
  },
});
