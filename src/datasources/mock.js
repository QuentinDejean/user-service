const user = (fn) => ({
  create: fn ? fn : jest.fn().mockResolvedValue(),
})

module.exports = user
