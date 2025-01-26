import SchoolModel from "~~/model/School.model";
import response from "~~/utils/response";
export default eventHandler({
  onRequest: [],
  async handler(event) {
    const allschools = await SchoolModel.find({});
    return response.success(event, {
      message: "Successfull",
      data: allschools,
    });
  },
});
