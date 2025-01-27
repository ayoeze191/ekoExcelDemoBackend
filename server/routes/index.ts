import response from "~~/utils/response";

export default eventHandler({
  onRequest: [],
  async handler(event) {
    response.success(event, {
      message: "sarewagba",
    });
  },
});
