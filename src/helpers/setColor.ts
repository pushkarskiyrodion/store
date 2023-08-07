export const setColor = (color: string) => {
  if (color === 'midnightgreen') {
    return 'rgb(40, 55, 42)';
  }

  if (color === 'spacegray') {
    return 'rgb(113, 115, 120)';
  }

  if (color === 'rosegold') {
    return '#F6D3D3';
  }

  return color;
};
