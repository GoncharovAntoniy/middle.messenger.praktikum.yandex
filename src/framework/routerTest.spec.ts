import { expect } from 'chai';
import Router from './router';

describe('Router Tests', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('#app');
  });

  describe('go()', () => {
    it('должен изменить текущий путь', () => {
      router.go('/test');
      expect(router.getCurrentPath()).to.equal('/test');
    });
  });

  describe('back()', () => {
    it('должен вернуться на предыдущую страницу', () => {
      router.go('/first');
      router.go('/second');
      router.back();
      expect(router.getCurrentPath()).to.equal('/first');
    });
  });

  describe('forward()', () => {
    it('должен перейти на следующую страницу', () => {
      router.go('/first');
      router.go('/second');
      router.back();
      router.forward();
      expect(router.getCurrentPath()).to.equal('/second');
    });
  });
});
