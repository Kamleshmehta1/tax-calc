// Sales tax is applicable at a rate of 10%
// • Books, food, and medical products that are exempted from sales tax
// • Import duty is an additional tax applicable on all imported goods at a rate of 5%, with no
// exemptions

const productName = document.querySelector(".prod");
const imported = document.querySelector(".checkbox");
const productPrice = document.querySelector(".price");
const dropDownItem = document.querySelector("#item-value");
let priceValue = 0;
let totalInt = 0;

let objData = {
  books: [],
  food: [],
  medical: [],
  others: [],
};

function createTable() {
  let mainData = JSON.parse(localStorage.getItem("data"));
  let list = document.querySelector("#book-list");
  list.innerHTML = "";

  for (let itemList in mainData) {
    let sum = 0;
    if (mainData[itemList].length != 0) {
      mainData[itemList].forEach((ele, index) => {
        sum += ele.price;
        let val = "element" + `${index}`;
        val = document.createElement("tr");
        val.innerHTML = `
          <td>${ele.name}</td>
          <td>${ele.price}</td>
          <td>${ele.imported}</td>
`;
        list.appendChild(val);
      });
      let totalData = document.querySelector(".total-data");
      totalData.innerHTML = `<h3>SALES TAX: ${totalInt}</h3><h3>TOTAL AMOUNT: ${sum}</h3>`;
    }
  }
}

createTable();

const handleSubmit = () => {
  if (dropDownItem.value === "" || productPrice.value === "") {
    alert("invalid input");
    return;
  }
  priceValue = Number(price.value);

  if (imported.checked) {
    totalInt += priceValue * 0.05;
    priceValue += priceValue * 0.05;
    if (
      dropDownItem.value !== "food" ||
      dropDownItem.value !== "medical" ||
      dropDownItem.value !== "books"
    ) {
      priceValue += priceValue * 0.1;
    }
  } else {
    if (dropDownItem.value === "others") {
      totalInt += priceValue * 0.1;
      priceValue += priceValue * 0.1;
    }
  }

  objData[`${dropDownItem.value}`].push({
    name: productName.value,
    price: Math.round(priceValue * 100) / 100,
    imported: imported.checked,
  });
  totalInt = Math.round(totalInt * 100) / 100;
  localStorage.setItem("data", JSON.stringify(objData));

  createTable();
};

const clearList = () => {
  localStorage.removeItem("data");
  location.reload();
};
