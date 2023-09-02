const handleCategory = async () => {
const res = await fetch(" https://openapi.programming-hero.com/api/videos/categories")
const data = await res.json();
const dataAll = data.data


const tabContainer = document.getElementById('tab-container');
dataAll.forEach(element => {
    const div = document.createElement('div');
    div.innerHTML = `
    <a onclick ="handleLoad('${element.category_id}')" class="tab  bg-gray-200 m-2 hover:bg-red-500 rounded tab-active hover:text-white font-medium ">${element.category}</a> 
    `
    tabContainer.appendChild(div)
});


}


let idValue;
const handleLoad = async (categoryId) => {
    idValue = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data =  await res.json();


    const noData = document.getElementById('no-data');  
    if(data.data.length=== 0){
        console.log('item.length')
        noData.classList.remove('hidden'); 
    } 
    else {
        noData.classList.add('hidden');  
    }
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ''
    data.data.forEach((item) => {
        
        const totalMinute = item.others.posted_date / 60;
        const totalHours = totalMinute / 60;
        const hoursValueTotal = Math.floor(totalHours);
        const minutes = Math.floor((hoursValueTotal - totalHours)* 60);

       
        const div = document.createElement('div');
        div.innerHTML = `
        <div class=" card shadow w-[290px] bg-gray-100">
            
            <figure>
             <img class = h-[200px] src=${item?.thumbnail} alt="">
             
            </figure>
            <div class="flex gap-2 pt-3">
                <div class="">
                
                <img class ="rounded-full w-[40px] h-[40px]" src=${item.authors[0].profile_picture} alt="">
                </div>
                <div>
                
                    <h3 class="font-bold">${item.title}</h3>
                    <div class="flex gap-2"> 
                    <p class=" text-sm py-1">${item.authors[0].profile_name}</p>

                    <span>${item.authors[0].verified? ('<img src="./fi_10629607.svg" alt="">') : '' } </span>
                    </div>
                    <p class="text-sm">${item?.others.views} views</p>
                 </div>
            </div>
          </div>

          <p class="relative bottom-28 bg-slate-900 w-[100px] text-center  text-white left-[177px] text-[8px] rounded py-1 ${item.others.posted_date > 0? '' : 'hidden' }   "> ${(hoursValueTotal > 0 || minutes > 0)? hoursValueTotal + 'hrs' + minutes + 'min ago' : '' } </p>
        `
        cardContainer.appendChild(div);
        
    });

   
    };

    document.getElementById('blog-btn').addEventListener('click', function() {
        window.location.href = 'question.html';
    });


    const sortView = async () =>{
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${idValue}`)
        const data =  await res.json();
        console.log(data.data);
        const sortData = data.data.sort((a,b)=> {
            return parseInt(b.others.views) - parseInt(a.others.views)

        })
        const cardContainer = document.getElementById('card-container');
        cardContainer.textContent = ''
        sortData.forEach(element => {
            const totalMinute = element.others.posted_date / 60;
            const totalHours = totalMinute / 60;
            const hoursValueTotal = Math.floor(totalHours);
            const minutes = Math.floor((hoursValueTotal - totalHours)* 60);
    
           
            const div = document.createElement('div');
            div.innerHTML = `
            <div class=" card shadow w-[290px] bg-gray-100">
                
                <figure>
                 <img class = h-[200px] src=${element?.thumbnail} alt="">
                 
                </figure>
                <div class="flex gap-2 pt-3">
                    <div class="">
                    
                    <img class ="rounded-full w-[40px] h-[40px]" src=${element.authors[0].profile_picture} alt="">
                    </div>
                    <div>
                    
                        <h3 class="font-bold">${element.title}</h3>
                        <div class="flex gap-2"> 
                        <p class=" text-sm py-1">${element.authors[0].profile_name}</p>
    
                        <span>${element.authors[0].verified? ('<img src="./fi_10629607.svg" alt="">') : '' } </span>
                        </div>
                        <p class="text-sm">${element?.others.views} views</p>
                     </div>
                </div>
              </div>
    
              <p class="relative bottom-28 bg-slate-900 w-[100px] text-center  text-white left-[177px] text-[8px] rounded py-1 ${element.others.posted_date > 0? '' : 'hidden' }   "> ${(hoursValueTotal > 0 || minutes > 0)? hoursValueTotal + 'hrs' + minutes + 'min ago' : '' } </p>
            `
            cardContainer.appendChild(div);
        });
    }

handleCategory();
handleLoad("1000");
