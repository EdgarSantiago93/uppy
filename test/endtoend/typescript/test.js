/* global browser */
describe('Project compiled with Uppy\'s TypeScript typings', () => {
  it('Should have correct imports (thus not crash)', async () => {
    await browser.url('http://localhost:4567/typescript')

    const root = await browser.$('.uppy-Root')
    const trigger = await browser.$('#pick-files')
    await root.waitForExist()
    await trigger.click()

    // IE doesn't support arrow functions
    // eslint-disable-next-line prefer-arrow-callback,func-names
    const typeofUppy = await browser.execute(function () {
      return typeof window.uppy
    })
    // It was initialized correctly
    expect(typeofUppy).to.equal('object')

    // The dashboard is shown
    const dashboard = await browser.$('.uppy-Dashboard')
    expect(await dashboard.isDisplayed()).to.equal(true)
  })
})
