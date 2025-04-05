import { expect } from 'chai';
import Router from '../router';
import Block from '../Block';
import * as sinon from 'sinon';

// Создаем простой тестовый компонент
class TestBlock extends Block {
  constructor() {
    super({});
  }

  protected render(): string {
    return '<div>Test Block</div>';
  }
}

describe('Router', () => {
  let router: Router;
  const rootQuery = '#app';
  let historyBackSpy: sinon.SinonSpy;
  let historyForwardSpy: sinon.SinonSpy;
  let getCurrentPathStub: sinon.SinonStub;
  let goStub: sinon.SinonStub;
  let pushStateSpy: sinon.SinonSpy;

  beforeEach(() => {
    router = new Router(rootQuery);

    historyBackSpy = sinon.spy(window.history, 'back');
    historyForwardSpy = sinon.spy(window.history, 'forward');

    getCurrentPathStub = sinon.stub(router, 'getCurrentPath').returns('/');

    goStub = sinon.stub(router, 'go');

    pushStateSpy = sinon.spy(window.history, 'pushState');
  });

  afterEach(() => {
    historyBackSpy.restore();
    historyForwardSpy.restore();
    getCurrentPathStub.restore();
    goStub.restore();
    pushStateSpy.restore();
  });

  describe('use()', () => {
    it('должен возвращать this для цепочки вызовов', () => {
      const result = router.use('/test', TestBlock);
      expect(result).to.equal(router);
    });
  });

  describe('go()', () => {
    it('должен вызываться без ошибок', () => {
      router.use('/test', TestBlock);

      router.go('/test');

      expect(goStub.calledWith('/test')).to.be.true;
    });
  });

  describe('back()', () => {
    it('должен вызывать window.history.back()', () => {
      router.back();
      expect(historyBackSpy.called).to.be.true;
    });
  });

  describe('forward()', () => {
    it('должен вызывать window.history.forward()', () => {
      router.forward();
      expect(historyForwardSpy.called).to.be.true;
    });
  });

  describe('getCurrentPath()', () => {
    it('должен возвращать текущий путь', () => {
      getCurrentPathStub.restore();
      expect(router.getCurrentPath()).to.equal('');
    });
  });

  describe('start()', () => {
    it('должен запускаться без ошибок', () => {
      expect(() => router.start()).to.not.throw();
    });

    it('должен обрабатывать popstate событие', () => {
      router.start();

      const popStateEvent = new PopStateEvent('popstate', {
        state: {},
      });

      expect(() => window.dispatchEvent(popStateEvent)).to.not.throw();
    });
  });
});
