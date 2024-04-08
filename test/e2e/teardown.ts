const teardownMongoDatabase = async (): Promise<void> => {
  // @ts-expect-error Stop mongod globally for the teardown
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await global.__MONGOD__.stop()
  console.log('Stop mongo mock')
}

const teardown = async (): Promise<void> => {
  await teardownMongoDatabase()
}

export default teardown
