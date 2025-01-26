const response = {
  success: (
    event: any,
    data: {
      message: string;
      data?: any;
    }
  ) => {
    return data;
  },
  error: (
    event: any,
    data: {
      statusCode: number;
      message?: string;
      data?: {
        message: string;
        data?: any;
      };
    }
  ) => {
    return sendError(
      event,
      createError({
        statusCode: data.statusCode,
        data: {
          message: data?.data?.message || data.message,
          data: data?.data?.data,
        },
      })
    );
  },
};

export default response;
