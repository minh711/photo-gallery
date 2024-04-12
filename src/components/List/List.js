import categories from "../../assets/data/categories.json" assert {type: 'json'};

export function List() {
  return /*html*/`
    <link rel="stylesheet" href="/src/components/List/List.css">
    
    <div class="list d-flex">

      <div class="categories d-flex">
        <div class="scroll d-flex align-items-center p-relative">
          ${renderCategories()}      
        </div>
      </div>
      <div class="tags">
        <div class="dropdown-group d-flex align-items-center justify-content-end p-relative">
      
          <a class="btn btn-link" href="#">Tags</a>
          
          <button class="btn btn-icon h-100" type="button" title="dropdown"><i class='bx bxs-chevron-down'></i></button>
            
          <div class="dropdown-menu p-absolute bg p-m rounded shadow">
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
              <div>Hello</div>
          </div>
        </div>
      </div>

    </div>
  `;
}

let categoriesWrapper;
let dropdownGroups;
let scroll;

let activeDropdownGroup;

document.addEventListener("DOMContentLoaded", function() {

  dropdownGroups = document.querySelectorAll(".dropdown-group");
  categoriesWrapper = document.querySelector(".categories");
  scroll = categoriesWrapper.querySelector(".scroll");

  if (scroll.querySelector(':last-child').tagName === "I") {
    dropdownGroups[dropdownGroups.length - 2].querySelector(".dropdown-menu").style.right = 0;
  }

  const pointerScroll = (element) => {

    let isDrag = false;
    
    const dragStart = () => isDrag = true;
    const dragEnd = () => isDrag = false;
    const drag = (e) => isDrag && (element.scrollLeft -= e.movementX);
    
    element.addEventListener("pointerdown", dragStart);
    addEventListener("pointerup", dragEnd);
    addEventListener("pointermove", drag);
  };
  
  document.querySelectorAll(".categories .scroll").forEach(pointerScroll);

  dropdownGroups.forEach((group) => {

    const dropDownBtn = group.querySelector(".btn-icon");
    
    dropDownBtn.addEventListener("click", () => {
    
      if (group.classList.contains("active")) {
    
        group.classList.remove("active");
        setTimeout(() => {
          scroll.classList.remove("active");
        }, 500);
        activeDropdownGroup = null;
    
      } else {
    
        try {
          activeDropdownGroup.classList.remove("active");
        } catch {}
        
        let groupRight = group.getBoundingClientRect().right;
        let groupLeft = group.getBoundingClientRect().left;
        let viewWidth = document.documentElement.clientWidth;
        if (groupRight > (viewWidth * 0.7)) {
          group.querySelector(".dropdown-menu").style.right = 0;
        }

        if ((groupLeft + 1) < (viewWidth * 0.1)) { // + 1 because groupLeft is not rounded like viewWidth
          group.querySelector(".dropdown-menu").style.left = "calc(100% - 2em)";
        }

        group.classList.add("active");
        scroll.classList.add("active");
        activeDropdownGroup = group;
    
      }
    
    });
  
  });

});

document.addEventListener("mousedown", (e) => {

    if (activeDropdownGroup != null) {

      let activeBtn = activeDropdownGroup.querySelector(".btn-icon");

      let isClickBtn = false;

      dropdownGroups.forEach((group) => {
          
        let btn = group.querySelector(".btn-icon");
        if (btn.contains(e.target)) {
          isClickBtn = true;
        }
      });

      let menu = activeDropdownGroup.querySelector(".dropdown-menu");

      if (!menu.contains(e.target) && !isClickBtn && !activeBtn.contains(e.target)) {

        activeDropdownGroup.classList.remove("active");
        setTimeout(() => {
          scroll.classList.remove("active");
        }, 500);
        activeDropdownGroup = null;
      
      }

    }
});

let totalCategories = Object.keys(categories).length;

function renderCategories() {

  let rs = ``;

  for (let i = 0; i < totalCategories; i++) {

    if (!categories[i].hasChild && categories[i].parentCategoryId == 0) {
      rs +=
      `
        <a class="btn btn-link" href="#">${categories[i].category}</a>
      `;
    } else if (categories[i].hasChild) {
      rs += renderDropdown(categories[i]);
    }
  }

  return rs;
}

function renderDropdown(parentCate) {

  let rs = ``;
  let menu = ``;

  categories.forEach((cate) => {
    if (cate.parentCategoryId == parentCate.id) {
      menu +=
      `
        <a class="btn btn-link" href="#">${cate.category}</a>
      `;
    }
  });

  rs += /*html*/
  `
    <div class="dropdown-group d-flex align-items-center p-relative">
    
      <a class="btn btn-link" href="#">${parentCate.category}</a>
      
      <button class="btn btn-icon h-100" type="button" title="dropdown"><i class='bx bxs-chevron-down'></i></button>
        
      <div class="dropdown-menu p-absolute bg p-m rounded border-fade-light shadow">
          ${menu}
      </div>
    </div>
  `;

  return rs;
}