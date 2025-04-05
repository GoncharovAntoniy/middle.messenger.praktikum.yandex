// function omit<T extends object>(obj: T, fields: (keyof T)[]) {
//   const result = { ...obj };
//   fields.forEach((field) => {
//     delete result[field];
//   });
//   return result;
// }

// function classNames(...args: any) {
//   let resultClass = '';
//   const addResultArray = (args2: any) => {
//     args2.forEach((value: any) => {
//       if (Array.isArray(value)) {
//         return addResultArray(value);
//       }
//       if (value === null || value === 0) {
//         return;
//       }
//       resultClass += `${value} `;
//     });
//   };
//   args.forEach((value: any) => {
//     if (value === null || value === 0) {
//       return;
//     }
//     if (Array.isArray(value)) {
//       return addResultArray(value);
//     }
//     if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//       for (const [key, val] of Object.entries(value)) {
//         if (val === true) {
//           resultClass += `${key} `;
//         }
//       }
//     } else if (Array.isArray(value) && value !== null) {
//       return addResultArray([...value]);
//     } else {
//       resultClass += `${value} `;
//     }
//   });
//   return resultClass;
// }

// Авторское решение =============
// const hasOwn = {}.hasOwnProperty;
// function classNames(...args: any[]): string {
//   const classes = [];

//   for (let i = 0; i < args.length; i++) {
//     const arg = args[i];
//     if (!arg) {
//       continue;
//     }

//     const argType = typeof arg;

//     if (argType === 'string' || argType === 'number') {
//       classes.push(arg);
//     } else if (Array.isArray(arg)) {
//       if (arg.length) {
//         // eslint-disable-next-line prefer-spread
//         const inner = classNames.apply(null, arg);

//         if (inner) {
//           classes.push(inner);
//         }
//       }
//     } else if (argType === 'object') {
//       if (arg.toString !== Object.prototype.toString) {
//         classes.push(arg.toString());
//       } else {
//         for (const key in arg as any) {
//           if (hasOwn.call(arg, key) && arg[key]) {
//             classes.push(key);
//           }
//         }
//       }
//     }
//   }

//   return classes.join(' ');
// }

// console.log(classNames('foo', { bar: true }, 0, [1, null, 0, 'baz', ['foo', ['test', 'res']]]));

// class ValidationError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = 'ValidationError';
//   }
// }

// function take<T>(list: T[], num = 1): T[] {
//   if (!Array.isArray(list) || typeof num !== 'number') {
//     throw new ValidationError('bad value');
//   }

//   return list.slice(0, num);
// }

// console.log(take([1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11, 12, 14, 13]], 20));

function unzip(...args: any) {
  args.forEach((arg: []) => {
    if (!Array.isArray(arg)) {
      throw new Error(`${arg} is not array`);
    }
  });
  const resultList: [] = [];
  const maxLength = Math.max(...args.map((item: []) => item.length));
  console.log(maxLength);
  for (let i = 0; i < maxLength; i++) {
    const group: [] = args.map((arr: []) => arr[i]);
    resultList.push(group as never);
  }
  return resultList;
}

console.log(unzip([1, 2, 3], [234, 34, 23, 4], [32]));
