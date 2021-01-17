const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
// const getRandArray = (length) => shuffleArray([...Array(length).keys()]);
const randCode = () => (Math.floor(Math.random() * 90000) + 10000).toString();
module.exports = { shuffleArray, getRandArray, randCode };
