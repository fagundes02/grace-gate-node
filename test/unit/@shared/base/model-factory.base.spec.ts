import { type Mongoose, type Model } from 'mongoose'

import ModelFactoryBase from '@app/@shared/base/model-factory.base'

interface ITest {
  status: string
}

describe('ModelFactoryBase', () => {
  const expectedBuildModel = {} as unknown as Model<ITest>

  class TestModel extends ModelFactoryBase<ITest> {
    protected modelName: string = 'test'
    protected build(): Model<ITest> {
      return expectedBuildModel
    }
  }

  it('should load class successfully and call the build method', () => {
    const modelFactory = new TestModel({} as unknown as Mongoose)
    expect(modelFactory.model).toEqual(expectedBuildModel)
  })

  it('should load class successfully and not call the build method, but instead, return the model from mongoose', () => {
    const newExpectedBuildModel = { test: 1 } as unknown as Model<ITest>
    const modelFactory = new TestModel({ models: { test: newExpectedBuildModel } } as unknown as Mongoose)
    expect(modelFactory.model).toEqual(newExpectedBuildModel)
  })
})
