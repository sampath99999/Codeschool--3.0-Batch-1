let products=[];

function getData(){
    const xhttp=new XMLHttpRequest();

    xhttp.onload=function(){
        if (xhttp.status === 200) {
          const  p = JSON.parse(xhttp.responseText);
        
          addProductToTable(p)
          } else {
            window.alert('Request failed with status:', xhttp.status);
          }
    }

    xhttp.open('GET','https://fakestoreapi.com/products');

    xhttp.send();
}


function addProductToTable(products){

    let table=document.getElementById('productTable');

    products.forEach(element => {
        console.log(element)
        const row=document.createElement('tr');
        row.innerHTML=(`
        <tr>
                      <th scope="row">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" />
                        </div>
                      </th>
                      <td>
                        <div class="d-flex ps-2">
                          <img
                            src="${element.image}"
                            alt=""
                            class="img rounded-2"
                            height="100px"
                            width="100px"
                          />
                          <div class="ps-1">
                            <h6>${element.title}</h6>
                            <p>${element.description}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="m-2 d-flex">
                          <div class="bg-light rounded-2 px-2 shadow">
                            ${element.category}
                          </div>
                          <div class="bg-light rounded-2 px-2 shadow">
                          ${element.category}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="d-flex">
                          <div class="c-br ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                          <div class="c-dbr ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                          <div class="c-lbr ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                          <div class="c-cr ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-circle-fill"
                              viewBox="0 0 16 16"
                            >
                              <circle cx="8" cy="8" r="8" />
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p class="fw-bold">${element.price}</p>
                      </td>
                      <td>
                        <p class="fw-bold">38</p>
                      </td>
                      <td>
                        <p class="fw-bold">UY37749</p>
                      </td>
                      <td>
                        <div class="d-flex">
                          <div class="ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-star-fill text-warning"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                              />
                            </svg>
                          </div>
                          <div class="ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-star-fill text-warning"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                              />
                            </svg>
                          </div>
                          <div class="ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-star-fill text-warning"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                              />
                            </svg>
                          </div>
                          <div class="ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-star-fill text-warning"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                              />
                            </svg>
                          </div>
                          <div class="ps-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-star-fill text-secondary"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
                              />
                            </svg>
                          </div>
                          <div class="text-secondary fw-bold ps-2 mt-1">
                            ${element.rating.rate}
                          </div>
                          <div class="text-muted ps-1 mt-1">(${element.rating.count})</div>
                        </div>
                      </td>
                      <td>
                        <div class="m-2 d-flex">
                          <div class="bg-light rounded-2 px-3 shadow">Edit</div>
                          <div class="px-5">
                            <div class="bg-light rounded-2 px-2 shadow">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="grey"
                                class="bi bi-three-dots"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
        `)

        table.appendChild(row)
    });

}

getData();
