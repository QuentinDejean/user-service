const httpResponse = {
  success: (payload) => ({
    statusCode: 200,
    body: JSON.stringify(payload),
  }),
  error: (code, message) => ({
    statusCode: code || 500,
    message: message || 'An unknown error occured',
  }),
}

module.exports = httpResponse
