import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder,
  ValidationComposite
} from '@validation/validators'
import { makeLoginValidation } from './login-validation-factory'

describe('LoginValidation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5)
      ])
    )
  })
})
