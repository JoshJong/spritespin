import * as SpriteSpin from '..'
import * as t from '../lib.test'

describe('SpriteSpin.Plugins#render-panorama', () => {

  let data: SpriteSpin.Data
  beforeEach((done) => {
    t.get$El().spritespin({
      source: t.WHITE40x30,
      width: 10,
      height: 10,
      animate: false,
      onComplete: done,
      plugins: ['panorama']
    })
    data = t.get$El().data(SpriteSpin.namespace)
  })

  afterEach(() => {
    SpriteSpin.destroy(data)
  })

  describe('basics', () => {

    it ('has has panorama plugin', () => {
      expect(data.plugins[0].name).toBe('panorama')
    })

    it ('renders the image as background', () => {
      expect(data.stage.css('background-image')).toContain(t.WHITE40x30)
    })
  })

  describe('horizontal', () => {
    beforeEach((done) => {
      t.get$El().spritespin({
        orientation: 'horizontal',
        width: 10,
        height: 30,
        onComplete: done
      })
    })

    it('has horizontal orientation', () => {
      expect(data.orientation).toBe('horizontal')
    })

    it('sets frames to image width', () => {
      expect(data.frames).toBe(40)
    })

    it('shifts image horizontally', () => {
      SpriteSpin.updateFrame(data, 1, data.lane)
      expect(data.stage.css('background-position')).toBe('1px 0px')
      SpriteSpin.updateFrame(data, 2, data.lane)
      expect(data.stage.css('background-position')).toBe('2px 0px')
    })
  })

  describe('vertical', () => {
    beforeEach((done) => {
      t.get$El().spritespin({
        orientation: 'vertical',
        width: 40,
        height: 10,
        onComplete: done
      })
    })

    it('has horizontal orientation', () => {
      expect(data.orientation).toBe('vertical')
    })

    it('sets frames to image height', () => {
      expect(data.frames).toBe(30)
    })

    it('shifts image vertically', () => {
      SpriteSpin.updateFrame(data, 1, data.lane)
      expect(data.stage.css('background-position')).toBe('0px 1px')
      SpriteSpin.updateFrame(data, 2, data.lane)
      expect(data.stage.css('background-position')).toBe('0px 2px')
    })
  })
})
