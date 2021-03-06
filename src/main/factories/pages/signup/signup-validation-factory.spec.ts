import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationBuilder as Builder,
  ValidationComposite
} from '@validation/validators'
import { CompareFieldsValidation } from '@validation/validators/compare-fields/compare-fields-validation'
import { makeSignupValidation } from './signup-validation-factory'

describe('SingUpValidation Factory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 5),
        new RequiredFieldValidation('email'),
        new EmailValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirm'),
        new CompareFieldsValidation('passwordConfirm', 'password')
      ])
    )
  })
})
