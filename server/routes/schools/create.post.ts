import SchoolModel from "~~/model/School.model";
import response from "~~/utils/response";
export default eventHandler({
  onRequest: [],
  async handler(event) {
    const body = await readBody(event);
    const school = new SchoolModel({
      name: body.name,
      location: body.location,
      uniqueNumber: body.uniqueNumber,
    });
    await school.save();
    return response.success(event, {
      message: "Successfully created",
    });
  },
});
