const errorHandler = (err, request, response, next) => {
  const statusCode = response.statusCode || 500;

  switch (statusCode) {
    case 400:
      response.json({
        data: null,
        message: err.message,
        success: false,
      });
      break;
    case 401:
      response.json({
        data: null,
        message: err.message,
        success: false,
      });
      break;

    default:
      response.json({ message: 'All looks good' });
      break;
  }
};

export default errorHandler;
