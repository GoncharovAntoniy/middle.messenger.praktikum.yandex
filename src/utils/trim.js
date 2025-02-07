export const trimOne = (string, chars) => {
  let str = ' ' + string + ' ';

  if (str && chars === undefined) {
    return string.trim();
  }

  if (!str || !chars) {
    return string || '';
  }

  const regFirst = new RegExp(` ${chars}`, 'gi');
  const regSecond = new RegExp(`${chars} `, 'gi');

  return str.replace(regFirst, '').replace(regSecond, '').trim();
};

export const trimTwo = (value, pattern = ' ') => {
  const regExp = new RegExp(`^[${pattern}]+|[${pattern}]+$`, 'g');
  return value.replace(regExp, '');
};
