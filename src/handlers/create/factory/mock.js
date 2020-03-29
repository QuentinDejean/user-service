const id = 'some-id'
const factory = jest.fn().mockImplementation((x) => ({ ...x, id }))

module.exports = { factory, id }
