import { List } from "../List/List.js";

export function Header() {

  return `
    <link rel="stylesheet" href="/src/components/Header/Header.css">
    
    <div class="header bg p-fixed top-0 w-100 shadow-drop">
      
      <div class="container p-relative">
        
        <div class="d-flex flex-wrap align-items-center p-relative">
          
          <div class="col-ld-3 col-md-2 col-sd-2 d-flex justify-content-start">
            <a href="./index.html" class="btn btn-logo" type="button">Home</a>
          </div>
          
          <div class="col-ld-6 col-md-8 col-sd-8">
            <form class="search " method="post">
              <div class="input-group">
                <button class="btn btn-icon" type="submit" name="submit" title="search"><i class='bx bx-search'></i></button>
                <input class="form-control" type="text" name="txtSearch" placeholder="Search...">
              </div>
            </form>
          </div>
          
          <div class="col-ld-3 col-md-2 col-sd-2 d-flex justify-content-end">
          </div>
        </div>
        
        ${List()}
    
      </div>
    
    </div>
  `;
}