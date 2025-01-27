import CourseModel from "~~/model/Course.model";
import response from "~~/utils/response";
export default eventHandler({
  onRequest: [],
  async handler(event) {
    const body = await readBody(event);
    const school = new CourseModel({
      name: body.name,
      description: body.description,
    });
    await school.save();
    return response.success(event, {
      message: "Successfully created",
    });
  },
});
