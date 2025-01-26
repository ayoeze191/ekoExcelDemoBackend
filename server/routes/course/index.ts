import CourseModel from "~~/model/Course.model";
import response from "~~/utils/response";

export default eventHandler({
  onRequest: [],
  async handler(event) {
    const courses = await CourseModel.find({});
    return response.success(event, {
      data: courses,
      message: "",
    });
  },
});
