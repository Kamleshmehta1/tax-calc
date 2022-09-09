// Sales tax is applicable at a rate of 10%
// • Books, food, and medical products that are exempted from sales tax
// • Import duty is an additional tax applicable on all imported goods at a rate of 5%, with no
// exemptions

const form = document.querySelector(".form");
const productName = document.querySelector(".product-name");
const imported = document.querySelector(".imported");
const productPrice = document.querySelector(".product-price");
const dropDownItem = document.querySelector("#cars");

let objData = {
  books: [{ name: "harry", price: 30, imported: true }],
  food: [{ name: "pizza", price: 300, imported: true }],
  medical: [],
  others: [],
};

let createTable = (itemList) => {
  const list = document.querySelector("#book-list");

  itemList.map(
    (ele) =>
      (list.innerHTML = `
    <tr>
  <td>${ele.name}</td>
  <td>${ele.price}</td>
  <td>${ele.imported}</td>
  </tr>
`)
  );
};

let mainData = JSON.parse(localStorage.getItem("data"));

for (let x in mainData) {
  createTable(mainData[x]);
}

const handleSubmit = (e) => {
  if (dropDownItem.value === "" || productPrice === "") {
    alert("invalid input");
    return;
  }
  let priceValue = Number(price.value);

  if (imported.checked) {
    priceValue += priceValue * 0.05;
    if (
      dropDownItem.value !== "food" ||
      dropDownItem.value !== "medical" ||
      dropDownItem.value !== "books"
    ) {
      priceValue += priceValue * 0.1;
    }
  } else {
    console.log(dropDownItem.value);
    if (dropDownItem.value === "others") {
      console.log("entered");
      priceValue += priceValue * 0.1;
    }
  }

  objData[`${dropDownItem.value}`].push({
    name: productName.value,
    price: Math.round(priceValue * 100) / 100,
    imported: imported.checked,
  });
  localStorage.setItem("data", JSON.stringify(objData));

  for (let x in objData) {
    createTable(objData[x]);
  }
};

const clearList = () => {
  localStorage.removeItem("data");
  location.reload();
};
