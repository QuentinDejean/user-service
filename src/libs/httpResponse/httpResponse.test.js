const httpResponse = require('./httpResponse')

describe('GIVEN httpResponse', () => {
  const { success, error } = httpResponse

  describe('AND the success method', () => {
    describe('WHEN the method is executed', () => {
      it('SHOULD return the correct payload', () => {
        expect(success({ message: 'success' })).toMatchSnapshot()
      })
    })
  })

  describe('AND the success method', () => {
    describe('WHEN the method is executed', () => {
      describe('AND no arguments are passed through', () => {
        it('SHOULD return the correct payload', () => {
          expect(error()).toMatchSnapshot()
        })
      })

      describe('AND no message is passed through', () => {
        it('SHOULD return the correct payload', () => {
          expect(error({ code: 403 })).toMatchSnapshot()
        })
      })

      describe('AND all arguments are passed through', () => {
        it('SHOULD return the correct payload', () => {
          expect(error({ code: 403, message: 'forbidden' })).toMatchSnapshot()
        })
      })
    })
  })
})
