import moment from 'moment';

const ResponseHelper = async (res, code, message, data, meta) => {
  const { responseReff } = res.app.locals;
  const responseTime = moment();

  const response = {
    code,
    message,
    data,
    meta,
    responseReff,
  };

  const setUpdate = {
    description: message,
    response_code: code,
    response_time: responseTime,
    response_body: JSON.stringify(response), // response_body: response
  };

  res.status(code).send(response);
};

export default ResponseHelper;
