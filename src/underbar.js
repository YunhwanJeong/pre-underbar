(function() {
  'use strict';

  window._ = {};

  // argument로 무엇이 전달되든간에, 있는 그대로 리턴하세요.
  // 이 함수가 쓸데없어 보일지 모르겠지만, 기억하세요! - 만약 함수에 iterator가 필요하고,
  // 뭐라도 넘겨줘야 하는 상황에는 이 함수가 유용할 것입니다.
  _.identity = function(val) {
    return val;
  };

  /**
  * COLLECTIONS
  * ===========
  *
  * 이 섹션에서는 우리는 collection이라고 불리는 값들의 집합을 이용하는 함수에 집중할겁니다.
  * JavaScript에서는 collection은 값들을 포함하며, 배열 혹은 객체가 될 수 있습니다.
  *
  *
  * IMPORTANT NOTE!
  * ===========
  *
  * .first 함수가 이미 구현되어 있습니다. 이 함수를 가이드 삼아, 앞으로 나올 함수들을 구현해보세요.
  * 사전에 이미 완료된 과제의 일부분을 만나게 될 경우, 반드시 코드를 잘 읽어보고 이해하고 넘어가십시오.
  * 이러한 과정을 지나친다면, 앞으로 구현하게 될 함수가 훨씬 더 어렵게 느껴질겁니다.
  */

  // 배열의 처음 n개의 element를 담은 배열을 리턴하세요.
  // 만일 n이 undefined일 경우, 단순히 첫번째 element를 리턴하세요.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // first와 비슷하게, 마지막 n개의 element를 담은 배열을 리턴하세요.
  // 만일 n이 undefined일 경우, 단순히 마지막 element를 리턴하세요.
  _.last = function(array, n) {
    if (n === 0) {
      return [];
    }
    return n === undefined ? array[array.length - 1] : array.slice(-n);
  };

  // iterator(value, key, collection)를 collection의 각각의 key-value pair에 대해 호출하세요.
  // iterator는 함수로 전달되며, 쉽게 말해 반복해서 실행하는 함수입니다.
  // collection으로 배열과 객체를 다 받을 수 있어야 합니다.
  // 참고로 배열의 value는 element이며, key는 index입니다.
  //
  // Note: _.each 는 아무런 값도 리턴하지 않습니다.
  // 다만 단순히 iterator 함수를 전달되는 collection의 각 항목에 대해 실행할 뿐입니다.
  //
  // Note 2: 이 문제를 풀기 위해서는 여러분이 spec 디렉토리에 있는 테스트 케이스의 요구사항을 잘 살펴볼 필요가 있습니다.
  // 실제로 어떻게 사용되는지 각 테스트 케이스 항목에 잘 나와 있습니다.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (let key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // target으로 전달되는 값이 array에서 발견되면, 그 index를 리턴하세요.
  // 만일 array에서 발견할 수 없다면 -1을 리턴하세요.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // 테스트 함수를 통과하는 모든 element를 담은 배열을 리턴하세요.
  _.filter = function(collection, test) {
    var filteredArr = [];
    
    _.each(collection, function (el) {
      if (test(el)) {
        filteredArr.push(el);
      }
    });

    return filteredArr;
  };

  // 테스트 함수를 통과하지 않는 모든 element를 담은 배열을 리턴하세요.
  _.reject = function(collection, test) {
    var filteredArr = [];
    
    _.each(collection, function (el) {
      if (!test(el)) {
        filteredArr.push(el);
      }
    });

    return filteredArr;
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // element가 중복되지 않는 새로운 array를 만드세요.
  _.uniq = function(array) {
    var noOverlapArr = [];

    _.each(array, function (el) {
      if (_.indexOf(noOverlapArr, el) === -1) {
        noOverlapArr.push(el);
      }
    })

    return noOverlapArr;
  };


  // iterator를 각 element에 적용한 결과를 담은 새로운 array를 리턴하세요.
  _.map = function(collection, iterator) {
    var mapedArr = [];

    _.each(collection, function (el, index, collection) {
      mapedArr.push(iterator(el, index, collection));
    })

    return mapedArr;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  // 객체의 배열을 가져와서, 그 안에 있는 특정 속성의 값의 배열을 리턴하세요.
  // 예를 들어, people이라는 객체가 담긴 배열을 가져와서, 그들의 나이만 리턴할 수 있어야 합니다.
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // 각 항목에 대해 iterator(accumulator, item)를 반복적으로 호출하여, Reduces an array to a single value by repetitively calling
  // 하나의 값으로 줄입니다. accumulator는 누적값으로, 이전 iterator 호출의 반환값이어야 합니다.
  //
  // reduce에 대한 세번째 argument로 초기값을 전달 할 수 있습니다.
  // 만일 초기값이 전달되지 않으면, 첫번재 element가 accumulator로 사용되며, iterator에 전달되지 않습니다.
  // 즉, 초기값이 전달되지 않은 경우, iterator는 두번째 element로부터 시작합니다.
  //
  // 예제:
  //   const numbers = [1,2,3];
  //   const sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // 6이 리턴됩니다
  //
  //   const identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // 5가 리턴됩니다, 전달한 iterator와 관계없이, 첫번째 element가 즉시 사용됩니다.
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      accumulator = collection[0];
      for (let i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator;
    } else {
      for (let i = 0; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
      return accumulator;
    }
  };

  // 배열 또는 객체가 주어진 값을 포함하는지 체크합니다. (`===` 연산자를 사용해서 판단합니다.)
  /**
   * 배열 - indexof
   * 객체 - for in
   */
  _.contains = function(collection, target) {
    if (Array.isArray(collection)) {
      if(_.indexOf(collection, target) === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      for (let key in collection) {
        if (collection[key] === target) {
          return true;
        }
      }
      return false;
    }
  };


  // 모든 element가 iterator에 의해 truthy한지 체크합니다.
  /** pseudo code
   * -
   */
  _.every = function(collection, iterator) {
    let isTruthy = true;

    if (iterator === undefined) {
      _.each(collection, function (val) {
        if (!val) {
          isTruthy = false;
        }
      })
    } else {
      _.each(collection, function (val) {
        if (!iterator(val)) {
          isTruthy = false;
        }
      });
    }
    return isTruthy;
}

  // element가 하나라도 iterator에 의해 truthy한지 체크합니다.
  // iterator가 없다면, element 그 자체가 truthy한지 체크하세요.
  _.some = function(collection, iterator) {
    let isTruthy = false;

    if (iterator === undefined) {
      _.each(collection, function (val) {
        if (val) {
          isTruthy = true;
        }
      })
    } else {
      _.each(collection, function (val) {
        if (iterator(val)) {
          isTruthy = true;
        }
      });
    }
    return isTruthy;
  };


  /**
  * OBJECTS
  * =======
  *
  * 이 섹션에서는, 객체를 서로 합쳐주는 몇개의 도우미 함수를 만들겁니다.
  */

  // 주어진 객체를 전달된 모든 속성으로 확장합니다.
  //
  // 예제:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1은 이제 다음 키를 포함합니다. key1, key2, key3, bla
  /**pseudo code
   * 인자로 전달된 모든 객체 & 속성 loop 돌면서 각 key-value 쌍을 obj로 할당.
   * 
   */
  _.extend = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // extend와 비슷하지만, 이번엔 이미 존재하는 key에 대해 값을 덮어쓰기 하지 않습니다.
  _.defaults = function(obj) {
    for (let i = 1; i < arguments.length; i++) {
      for (let key in arguments[i]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  };


/**
  * FUNCTIONS
  * =========
  *
  * 이번엔 함수 데코레이터(decorator)를 사용합니다. 함수 데코레이터는 쉽게 말해, 어떤 함수를 받아들이고
  * 다소 다르게 작동하는 새로운 버전의 함수를 리턴하는 함수를 의미합니다.
  */

  // 최대 한번만 호출할 수 있는 함수를 리턴합니다. 이후의 호출은 이전에 한번 리턴된 값만을 리턴해야 합니다.
  // _.once = function(func) {
  //   // TIP: 아래 변수는 클로저 scope (바깥 함수 범위)에 저장되며, 리턴된 새로운 함수가 호출될 때마다,
  //   // 여전히 클로저 scope 내에 존재하므로, 리턴된 함수에서 사용할 수 있습니다.
  //   var alreadyCalled = false;
  //   var result;
  //   // TIP: We'll return a new function that delegates to the old one, but only
  //   // if it hasn't been called before.
  //   return function() {
  //     let args = arguments;
  //     if (!alreadyCalled) {
  //       alreadyCalled = true;
  //       result = func.apply(this, args);
  //       return result;
  //     } else {
  //       return result; 
  //     }
  //     // TIP: arguments 키워드 혹은, spread operator를 사용하세요.
  //   }
  // };
  _.once = function(func) {
    // TIP: 아래 변수는 클로저 scope (바깥 함수 범위)에 저장되며, 리턴된 새로운 함수가 호출될 때마다,
    // 여전히 클로저 scope 내에 존재하므로, 리턴된 함수에서 사용할 수 있습니다.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(...args) {
      if (!alreadyCalled) {
        alreadyCalled = true;
        result = func(...args);
        return result;
      } else {
        return result; 
      }
      // TIP: arguments 키워드 혹은, spread operator를 사용하세요.
    }
  };

  // 주어진 시간 (밀리초) 동안 함수를 지연한 다음 제공된 argument로 함수를 호출합니다.
  //
  // 원래 함수에 대한 argument는 wait parameter 뒤에 전달됩니다.
  // 예를 들어, 다음을 호출할 경우
  // _.delay(someFunction, 500, 'a', 'b');
  // someFunction('a', 'b') 은 500ms 이후에 호출됩니다.
  // _.delay = function(func, wait, ...args) {
  //   setTimeout(func, wait, ...args);
  // };
  _.delay = function(func, wait) {
    let argumentsArr = Array.from(arguments);
    let args = argumentsArr.slice(2);
    setTimeout(func, wait, ...args);
  };


  /**
  * ADVANCED COLLECTION OPERATIONS
  * ==============================
  */

  // 다차원 배열을 가져와서, 1차원 배열로 변환합니다.
  // 새 배열에는 다차원 배열의 모든 요소가 포함되어야 합니다.
  //  _.flatten = function(nestedArray, result) {
  //  }
  // Hint: Array.isArray 를 사용해 배열인지 아닌지를 체크하세요.
  /**pseudo code
   * 1. reduce concat
   * 2. while
   */
  // 1. reduce를 재귀적으로 이용 (result x)
  _.flatten = function(nestedArray) {
    let reducer = (acc, val) => Array.isArray(val) ? acc.concat(_.flatten(val)) : acc.concat(val);

    return _.reduce(nestedArray, reducer, []);
  };

  // 2. while문 활용 (pop, push 대신 shift, unshift 써도 무관)
  // _.flatten = function(nestedArray) {
  //   const stack = [...nestedArray];
  //   const flattenedArr = [];

  //   while (stack.length) {
  //     const el = stack.pop();
  //     if (Array.isArray(el)) {
  //       stack.push(...el);
  //     } else {
  //       flattenedArr.push(el);
  //     }
  //   }
  //   return flattenedArr.reverse();
  // }


  // 배열 내용의 순서를 랜덤하게 변경합니다.
  //
  // TIP: 이 함수는 immutable해야 합니다.
  /**pseudo code
   * 1. for문
   *  1-1 임의의 변수(es6 이전)
   *  1-2 구조 분해 할당(es6 이후)
   * 
   * 2. while문
   *  2-1 임의의 변수(es6 이전)
   *  2-2 구조 분해 할당(es6 이후)
   */
  
  //1-1
  // _.shuffle = function(array) {
  //   let shuffledArr = [...array];

  //   for (let i = shuffledArr.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * i + 1);
  //     let keeper = shuffledArr[i];
  //     shuffledArr[i] = shuffledArr[j];
  //     shuffledArr[j] = keeper;
  //   }
  //   return shuffledArr;
  // };

  //1-2
  // _.shuffle = function(array) {
  //   let shuffledArr = [...array];
  //   for (let i = shuffledArr.length - 1; i > 0; i--) {
  //     let j = Math.floor(Math.random() * i + 1);
  //     [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  //   }
  //   return shuffledArr;
  // }

  //2-1
  // _.shuffle = function(array) {
  //   let shuffledArr = [...array];
  //   let i = shuffledArr.length - 1, j, keeper

  //   while (i > 0) {
  //     i--;
      
  //     j = Math.floor(Math.random() * i + 1);
  //     keeper = shuffledArr[i];
  //     shuffledArr[i] = shuffledArr[j];
  //     shuffledArr[j] = keeper;
  //   }
  //   return shuffledArr;
  // }
  
  //2-2
  _.shuffle = function(array) {
    let shuffledArr = [...array];
    let i = shuffledArr.length - 1, j, keeper

    while (i > 0) {
      i--;
      
      j = Math.floor(Math.random() * i + 1);
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  }


  /**
  * ADVANCED
  * =================
  *
  * Note: This is the end of the pre-course curriculum. Feel free to continue,
  * but nothing beyond here is required.
  */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

  /**주제: parameter functionOrKey에 메소드를 전달받아 collection 내의 list의 각 요소에 호출하는 함수를 작성.
   * 기능 한 줄 정의: 함수 또는 함수명을 인자로 전달받아 -> collection의 각 요소들에 대해 apply한 결과를 리턴
   * 연관 개념: apply, map
   * 유의점: apply가 인수를 배열로 받지만, 모든 인수에 대해 한 번씩 실행하는것은 아니다. args는 각 요소들에 특정 symbol을 더한다.
   * 알고리즘: 함수가 전달되면 map, apply를 활용 / 함수명이 전달되면 함수명을 찾아 map, apply하여 리턴
   * 수도코드: collection, functionOrKey, args 입력
   *  -functionOrKey가 함수이면 -> 
   *  -functionOrKey가 string이면 -> typeof window[functionOrKey]가 함수이면 -> .apply(null, collection)
   */
  _.invoke = function(collection, functionOrKey, args) {
    if(typeof functionOrKey === "function") {
      return _.map(collection, function(element) {
        return functionOrKey.apply(element);
      });
    } else if(typeof collection[0] === 'string') {
      let fn = String.prototype[functionOrKey];

      return _.map(collection, function(element) {
        return fn.apply(element);
      });
    } else if(Array.isArray(collection[0])) {
      let fn = Array.prototype[functionOrKey];

      return _.map(collection, function(element) {
        return fn.apply(element);
      });
    };
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.

  /**pseudo code
   * 
   * 반복자가 문자열이면 대괄호표기법 사용하여 sort.
   * 나머지는 undefined 고려하여 sort.
   * 
   * 
   */
  _.sortBy = function(collection, iterator) {
    if(typeof iterator === "string") {
      collection.sort(function(a, b) {
        return a[iterator] - b[iterator];
      })
    } else {
      collection.sort(function(a, b) {
        if(!a || !b) {
          return 1;
        } else {
          return iterator(a) - iterator(b);
        }
      })
    }
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]

  /**pseudo code
   * 
   * 인수들을 배열로 만들어 변수 args 선언.
   * length 내림차순으로 sort.
   * 2중 loop
   * 
   */
  _.zip = function() {
    let result = [];
    let args = [...arguments];
    
    args.sort(function(a, b) {
      return b.length - a.length;
    });
    let longestLength = args[0].length;


    for(let i = 0; i < longestLength; i++) {
      let arr = [];
      for(let j = 0; j < args.length; j++) {
        arr.push(args[j].shift());
      }
      result.push(arr);
    }

    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.

  /**pseudo code
   * 
   * 주어진 배열의 요소들 중 중복되는 요소들만 모은 새로운 배열을 리턴.
   * 
   * 인자들을 배열로 만듦.
   * flatten 활용하여 하나의 배열로 만듦.
   * indexof 활용하여 -1 리턴되면 넘어가고, 아니면 새로운 배열에 집어넣고 원본은 삭제.
   */
  _.intersection = function() {
    let result = [];
    let args = [...arguments];
    let flattenArgs = _.flatten(args);

    for(let i = 0; i < flattenArgs.length; i++) {
      if(_.indexOf(flattenArgs.slice(i + 1), flattenArgs[i]) !== -1) {
        result.push(flattenArgs[i]);
        flattenArgs.splice(i, 1);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.

  /**pseudo code
   * 
   * 첫 번째를 제외한 나머지 인자들을 배열로 만듦.
   * indexOf 활용.
   */
  _.difference = function(array) {
    let result = [];
    let args = [...arguments];
    let extraArgs = args.slice(1);
    let flattenExtraArgs = _.flatten(extraArgs);
    let standardArg = array;

    for(let i = 0; i < standardArg.length; i++) {
      if(_.indexOf(flattenExtraArgs, standardArg[i]) === -1) {
        result.push(standardArg[i]);
      }
    }

    return result;
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
