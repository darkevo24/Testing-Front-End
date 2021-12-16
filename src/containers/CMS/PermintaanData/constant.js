export const prefixID = (id) => {
  if (id < 10) return `PD0000${id}`;
  else if (id < 100) return `PD000${id}`;
  else if (id < 1000) return `PD00${id}`;
  else if (id < 10000) return `PD0${id}`;
  else return `PD${id}`;
};
