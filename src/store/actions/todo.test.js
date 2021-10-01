import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './todo';
import store from '../store';

const stubTodo = {
  id: 0,
  title: 'title 1',
  content: 'content 1'
};

describe('ActionCreators', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  // Implementation using `jest.fn` API
  /*
  it(`'getTodos' should fetch todos correctly`, (done) => {
    const stubTodoList = [{
      id: 0,
      title: 'title 1',
      content: 'content 1'
    }, ];

    // Replace axios.get with mock
    axios.get = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubTodoList
        };
        resolve(result);
      })
    });

    store.dispatch(actionCreators.getTodos()).then(() => {
      const newState = store.getState();
      expect(newState.td.todos).toBe(stubTodoList);
      expect(axios.get).toHaveBeenCalledTimes(1);
      done();
    });
  });
  */
  // Implementation using `spyOn` API
  it(`'getTodos' should fetch todos correctly`, (done) => {
    const stubTodoList = [stubTodo];

    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTodoList
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getTodos()).then(() => {
      const newState = store.getState();
      expect(newState.td.todos).toBe(stubTodoList);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'getTodo' should fetch todo correctly`, (done) => {
    const spy = jest.spyOn(axios, 'get')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubTodo
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.getTodo()).then(() => {
      const newState = store.getState();
      expect(newState.td.selectedTodo).toBe(stubTodo);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  // 오류 발생하는 코드 
  // it(`'postTodo' should post todo correctly`, (done) => {
  //   const spy = jest.spyOn(axios, 'post')
  //     .mockImplementation((url, td) => {
  //       return new Promise((resolve, reject) => {
  //         const result = {
  //           status: 200,
  //           data: stubTodo
  //         };
  //         resolve(result);
  //       });
  //     })

  //   store.dispatch(actionCreators.postTodo(stubTodo)).then(() => {
  //     expect(spy).toHaveBeenCalledTimes(1);
  //     done();
  //   });
  // });
  it(`'postTodo' should post todo correctly`, (done) => {
    const stubPostingTodo = {...stubTodo, dueDate:{
      year: 2021,
      month: 11,
      date: 11
    }}
    const spy = jest.spyOn(axios, 'post')
      .mockImplementation((url, td) => {
        const {dueDate, todo} = td
        const retTodo = {
          ...td,
          ...dueDate,
        }
        return new Promise((resolve, reject) => {
          const result = {
            status: 201,
            data: retTodo
          };
          resolve(result);
        });
      })
    // 틀린 부분
    store.dispatch(actionCreators.postTodo(stubPostingTodo)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });


  it(`'deleteTodo' should delete todo correctly`, (done) => {
    const spy = jest.spyOn(axios, 'delete')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: null,
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.deleteTodo()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it(`'toggleTodo' should toggle todo correctly`, (done) => {
    const spy = jest.spyOn(axios, 'put')
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: null,
          };
          resolve(result);
        });
      })

    store.dispatch(actionCreators.toggleTodo()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
