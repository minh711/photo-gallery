import images from "../../assets/data/product-image.json" assert {type: 'json'};
import products from "../../assets/data/products.json" assert {type: 'json'};


let totalImagesDisplay = 6;
let totalImages = Object.keys(images).length;

export function Banner() {

  return `
    <link rel="stylesheet" href="/src/components/Banner/Banner.css">

    <div class="banner bg-primary">

      <div class="container p-relative bg rounded shadow">
        <div class="images d-flex p-relative">
          ${renderImages(totalImagesDisplay, totalImages)}
        </div>
        <button id="btn-refresh" class="btn btn-circle p-absolute" type="button" title="refresh"><i class='bx bx-refresh'></i></button>
      </div>
        
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function() {
  const btnRefresh = document.querySelector("#btn-refresh");
  btnRefresh.addEventListener("click", () => {
    
    const bannerElement = document.querySelector('.banner .images');

    bannerElement.innerHTML =
    `
      ${renderImages(totalImagesDisplay, totalImages)}
    `;
  });
});

function randomIndex(len, range) {
  const arr = [];
  
  while (arr.length < len) {
    let randomValue = Math.floor(Math.random() * range); 
    if (!arr.includes(randomValue)) {
      arr.push(randomValue);
    }
  }
  
  return arr;
}

function renderImages(totalImagesDisplay, totalImages) {

  let result = ``;

  let indexArray = randomIndex(totalImagesDisplay, totalImages);

  for (let i = 0; i < totalImagesDisplay; i++) {
    result +=
    `
      <style>
        .banner #item-${i + 1} .image {
          background-image: url('${images[indexArray[i]].image}');
        }
      </style>
      <a href="#" id="item-${i + 1}" class="item col-ld-4 col-md-4 col-sd-4 p-relative">
        <div class="image rounded"></div>
        <div class="product p-absolute top-0 w-100">
          <div class="bg pill m-s p-s">${products[images[indexArray[i]].productId - 1].name}</div>
        </div>
        <div class="caption p-absolute bottom-0 w-100">${images[indexArray[i]].caption}</div>
      </a>
    `;
  }

  return result;
}
