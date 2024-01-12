import images from "../../assets/data/product-image.json" assert {type: 'json'};
import products from "../../assets/data/products.json" assert {type: 'json'};
import tags from "../../assets/data/tags.json" assert {type: 'json'};
import categories from "../../assets/data/categories.json" assert {type: 'json'};

export function Display(props) {

  let _productId = props.productId;
  let _product = products[_productId - 1];
  let _category = categories[_product.categoryId - 1].category;
  let _images = [];

  images.forEach((image) => {
    if (image.productId === _productId) {
      _images.push(image);
    }
  });

  return `
    <link rel="stylesheet" href="../src/components/Display/Display.css">

    <div class="container">

      <style>
        .display .images {
          grid-template-rows: repeat(${_product.rows}, 24vw);
        }
      </style>

      <div class="display">

        <div class="category fs-l">${_category}</div>

        <div class="product fs-m">${_product.name}</div>

        <div class="description">${_product.description}</div>

        <div class="images">
        
          ${renderImages(_images)}

        </div>

      </div>
    
    </div>
    
  `;
}

function renderImages(images) {

  let rs = ``;

  for (let i = 1; i <= images.length; i++) {
    rs +=
    `
      <style>
        .display #item-${i} {
          grid-area: ${images[i - 1].span};
        }

        .display #item-${i} .image {
          background-image: url('${images[i - 1].image}');
        }
      </style>

      <div id="item-${i}" class="item p-relative">
        <div class="image rounded w-100 h-100"></div>
        <div class="caption p-absolute bottom-0 w-100">${images[i - 1].caption}</div>
      </div>
    `;
  }

  return rs;
}