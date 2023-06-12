export function standardStockName(name) {
  //Gets rid of unnecesary text after company name
  if (name.includes("Common Stock")) {
    let newName = name.split(".");
    newName.pop();
    newName.join("");
    newName = newName + ".";

    return newName;
  }

  return name;
}
