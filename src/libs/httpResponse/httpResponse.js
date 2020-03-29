const httpResponse = {
  success: (payload) => ({
    statusCode: 200,
    data: JSON.stringify(payload),
  }),
  error: (code, message) => ({
    statusCode: code || 500,
    errors: {
      status: code || 500,
      detail: message || 'An unknown error occured',
    },
  }),
}

module.exports = httpResponse
