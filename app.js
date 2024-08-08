
//MVC -model view Controller patter Item controller Storage Controller UI controller

const storagectrl = (function () {
  return {
    updateUI:function(){
      if(localStorage.getItem("items")===null){
      }else{
      let items=JSON.parse(localStorage.getItem("items"));
      items.forEach((item)=>{
        // console.log(item);
            uiCtrl.addListItem(item);
            itemsCtrl.addItem(item.name,item.cost);
            uiCtrl.showMoney(itemsCtrl.getTotalMoney());
      
      })
    }
    },
    store: function(item){
      let items;
      if(localStorage.getItem("items")===null){
        items=[];
        items.push(item);
        localStorage.setItem("items",JSON.stringify(items));
      }
      else{
       items=JSON.parse(localStorage.getItem("items"))
       items.push(item);
       localStorage.setItem("items",JSON.stringify(items));
      }
    },
    deleteStorage:function(id){
      let items=JSON.parse(localStorage.getItem("items"));
      items.forEach((item)=>{
          if(item.id == id){
                const index=  items.indexOf(item); 
                items.splice(index,1);
          }
      })
      localStorage.setItem("items",JSON.stringify(items));
    },
    updateStorage: function(updatedItem){
      let items=JSON.parse(localStorage.getItem("items"));
      items.forEach((item)=>{
          if(item.id == updatedItem.id){
                item.name = updatedItem.name;
                item.cost=updatedItem.cost;
          }
      })
      localStorage.setItem("items",JSON.stringify(items));
    },
    clear:function(){
      localStorage.clear();
    }
  }

})();//immediate invoke function

const itemsCtrl = (function () {

  const Item = function (id, name, cost) {
    this.id = id;
    this.name = name;
    this.cost = cost;
  }
  const data = {
    Items: [],
    currentItem: null,
    totalMoney: 0
  }
  return {
    getItem: function () {
      return data.Items;
    },
    addItem: function (name, cost) {
      let ID = 0;
      if (data.Items.length > 0) {
        ID = data.Items[data.Items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      cost = parseInt(cost);
      const newItem = new Item(ID, name, cost);
      data.Items.push(newItem);

      return newItem;
    },
    getTotalMoney: function () {
      let total = 0;
      if (data.Items.length > 0) {
        data.Items.forEach(item => {
          total += parseInt(item.cost);
        })
      } else {
        total = 0;
      }
      return total;
    },
    getItembyId: function (ID) {
      
      let found = null;
      data.Items.forEach(item => {
        // console.log(item.id+" hll");
        if (item.id == ID) {
           
          found = item;
        }
      });
      return found;
    },
    setCurrItem: function (Item) {
      // console.log(Item);
      data.currentItem = Item;
    },
    getCurrItem: function () {
      return data.currentItem;
    },
    deleteCurrItem: function(currentId) {
       const ID=data.Items.map(function (x) {
          return x.id;
       }).indexOf(currentId);
        data.Items.splice(ID,1);
      // console.log(data.Items[ID]);
    },
    updateData:function(input){
        let found = null;
        money = parseInt(input.cost);
        data.Items.forEach((item)=>{
            if(item.id == data.currentItem.id){
              item.name=input.name;
              item.cost=money;
              found=item;
            }
        })
        return found;
    },
    clearAll: function(){
      data.Items=[];
    }
  };
})();//immediate invoke function
const uiCtrl = (function () {


  return {

    populatedItemList: function (Items) {
      let html = "";
      Items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}" >
                  <Strong>${item.name}</Strong> : <em>${item.cost} rs</em>
                  <a href="#" class="secodary-content right">
                    <i class="fa-solid fa-pencil edit-items"></i>
                  </a>
            </li>`
      });
      document.querySelector("#item-list").innerHTML = html;
    },
    cleatEditstate: function () {
      document.querySelector(".add-btn").style.display = "inline";
      document.querySelector(".update-btn").style.display = "none";
      document.querySelector(".delete-btn").style.display = "none";
      document.querySelector(".back-btn").style.display = "none";
    },
    showEdit: function () {
      // console.log("i got clicked")

      document.querySelector(".add-btn").style.display = "none";
      document.querySelector(".update-btn").style.display = "inline";
      document.querySelector(".delete-btn").style.display = "inline";
      document.querySelector(".back-btn").style.display = "inline";


    },
    getIteminput: function () {
      return {
        name: document.querySelector("#item-name").value,
        cost: document.querySelector("#item-money").value
      }
    },
    addListItem: function (item) {
      const li = document.createElement("li");
      li.className = "collection-item";
      const val = item.id;
      li.id = `item-${val}`;
      li.innerHTML = `<Strong>${item.name}</Strong> : <em>${item.cost} rs</em>
            <a href="#" class="secodary-content right">
                       <i class="fa-solid fa-pencil edit-items"></i>
            </a>`;
      // console.log(li);
      document.querySelector("#item-list").appendChild(li);

    },
    showMoney: function (total) {
      document.querySelector(".total-money").innerText = total;
    },
    // updateMoney: function (cost) {
    //   var total = parseInt(document.querySelector(".total-money").innerText)
    //   total += cost;
    //   document.querySelector(".total-money").innerText = total;
    // },
    showCurrentItem: function () {
      // console.log(itemsCtrl.getCurrItem())
      document.querySelector("#item-name").value = itemsCtrl.getCurrItem().name;
      document.querySelector("#item-money").value = parseInt(itemsCtrl.getCurrItem().cost);
    },
    deletFromList: function (id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(`${itemId}`);
      // console.log(id);
      item.remove();
    },
    // reduceMoney:function(cost){
    //   var total = Number(document.querySelector(".total-money").innerText)
    //  var cost = Number(cost);
    // //  console.log(typeof(cost));
    //   document.querySelector(".total-money").innerText = total-cost;
    // },
    clearInputfield: function () {
      document.querySelector("#item-name").value = "";
      document.querySelector("#item-money").value = "";
    },
    update:function(item){
         document.querySelectorAll("li").forEach((li)=>{
             const itemId=li.getAttribute("id");
             if(itemId ===`item-${item.id}`){
                li.innerHTML=`
                <strong>${item.name}</strong> : <em>${item.cost} rs</em>
                <a href="#" class="secodary-content right">
                  <i class="fa-solid fa-pencil edit-items"></i>
                </a>`
             }
         }
         )
    },
    clearAll: function(){
      document.querySelector("#item-list").innerHTML="";
  }
  }
})();//immediate invoke function
const APP = (function () {
  const loadEventListener = function () {
    document.querySelector(".add-btn").addEventListener("click", getInputItem)
    document.querySelector("#item-list").addEventListener("click", itemEditClick);
    document.querySelector(".delete-btn").addEventListener("click", itemDelete);
    document.querySelector(".clear-btn").addEventListener("click", clearAll);
    document.querySelector(".update-btn").addEventListener("click", updateItem);
    document.querySelector(".back-btn").addEventListener("click", goBack);

  }
  const itemEditClick = function (e) {
    // console.log(e.target.classList);
    if (e.target.classList.contains("edit-items")) {
      uiCtrl.showEdit();
      const listId = e.target.parentElement.parentElement.id;
     
      const listArr = listId.split("-");
     
      const idItem = itemsCtrl.getItembyId(listArr[1]);
      // console.log(idItem);
      itemsCtrl.setCurrItem(idItem);
      uiCtrl.showCurrentItem();

      // console.log(setCurrItem);
    }
  }
  const itemDelete = function () {
    const currentId = itemsCtrl.getCurrItem().id;
    
    // console.log(currentId);
    itemsCtrl.deleteCurrItem(currentId);
    uiCtrl.deletFromList(currentId);
    storagectrl.deleteStorage(currentId);
    // uiCtrl.reduceMoney(itemsCtrl.getCurrItem().cost)
    uiCtrl.showMoney(itemsCtrl.getTotalMoney());
    uiCtrl.clearInputfield();
    goBack();
  }
  const getInputItem = function () {
    const input = uiCtrl.getIteminput();
    if (input.name.trim() === "" || input.cost.trim() === "") {
      alert("Fill The Required Fields")
    } else {
      const newItem = itemsCtrl.addItem(input.name, input.cost);
      uiCtrl.addListItem(newItem);
      // uiCtrl.updateMoney(newItem.cost);
      storagectrl.store(newItem);
      uiCtrl.showMoney(itemsCtrl.getTotalMoney());
      uiCtrl.clearInputfield();
    }
  }
  const updateItem= function(){
    const inputData= uiCtrl.getIteminput();
    const  updatedItem = itemsCtrl.updateData(inputData);
    // console.log(updatedItem);
     uiCtrl.update(updatedItem);
     storagectrl.updateStorage(updatedItem);
     const totalMoney = itemsCtrl.getTotalMoney();
        uiCtrl.showMoney(totalMoney);
        goBack();
  }
  const clearAll=function(e){
    e.preventDefault();
    itemsCtrl.clearAll();
    uiCtrl.clearAll();
    uiCtrl.showMoney(itemsCtrl.getTotalMoney());
    storagectrl.clear();
  }
  const goBack=function(){
    uiCtrl.cleatEditstate();
    uiCtrl.clearInputfield();
   
  }

  return {
    start: function () {
      uiCtrl.cleatEditstate();
      storagectrl.updateUI();
      const Items = itemsCtrl.getItem();
      //  uiCtrl.loadMoney(Items);
      if (Items.length > 0) {

        uiCtrl.populatedItemList(Items);
        const totalMoney = itemsCtrl.getTotalMoney();
        uiCtrl.showMoney(totalMoney);
      }
      loadEventListener();

    }
  }
})();//immediate invoke function
APP.start();
