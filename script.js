const accesskey = "-QSA2tEmVwwXvsPUd-PAshd1h6qZ56iJqOgrptuVN1o"
const formE = document.querySelector("form")
const inputE = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showmore = document.getElementById("show-more-button")

let inputdata = ""
let page = 1;
async function searchimg(){
    inputdata = inputE.value;
    //whatever the input entered by the user is sotred in this 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`
    //for creating a dynamic variable we use backtick
    //page no is also dynamic so we used ${}
    //query-keyword that user entered
    //our api = clint_id--dynamic
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results // we stored the results we obtained in this results variable
    if(page == 1){
        searchResults.innerHTML = ""
    } // initilaze page no
    results.map((result)=>{
        // we need to push all data inside the templete we used
        // i.e every time we search new images we generate new boxes for new images
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        //small for thumbnail size
        image.alt= result.alt_description
        const imglink = document.createElement("a")
        imglink.href = result.links.html
        imglink.target = "_blank"
        imglink.textContent=result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imglink)
        searchResults.appendChild(imageWrapper)
    })
    // inside the results variable there are a lot of images and data, we need to show images one by
    // one so we used a map for this results variable
    page++;
    if(page>1){
        showmore.style.display = "block"
    }


}
formE.addEventListener("submit", (event)=>{
    event.preventDefault()
    page =1;
    searchimg()
})
showmore.addEventListener("click", ()=>{
    searchimg()
})