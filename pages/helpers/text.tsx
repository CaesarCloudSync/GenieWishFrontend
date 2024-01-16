export const capitalize = (word:any) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}
export const capitalizeAll= (sentence:string) => {
  const words = sentence.split(" ");


  return words.map((word) => { return word[0].toUpperCase() + word.substring(1); }).join(" ");
}