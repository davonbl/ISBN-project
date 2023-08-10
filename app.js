let ISBN = document.querySelector("#getISBN");
let bookmarks = document.querySelector('#bookmarks')
let pickAllBooks = document.querySelector('.books')

//global values
let haveBook = JSON.parse(localStorage.getItem('Books'))

// console.log(haveBook)
// console.log(haveBook[0]['ISBN'])

if(localStorage.getItem('Books')){
  let convertBooks = JSON.parse(localStorage.getItem('Books'));
  console.log(convertBooks)
  console.log(convertBooks[0].ID)
  // console.log(convertBooks.length)
  for(let i=0; i < convertBooks.length; i++){
    let displayBook = document.createElement('p');
    // console.log('testing: ', convertBooks[i]['Title'])

    let titleNAuthor = convertBooks[i]['Title'] + ' by ' + convertBooks[i]['Author']
    displayBook.innerText = titleNAuthor


    // bookmarks.append(displayBook)
    let bookContainer = document.createElement('div')
    bookContainer.append(displayBook)

    bookmarks.append(bookContainer); 

    // bookContainer.setAttribute('id',`${lowerCaseName}${i}`)
    bookContainer.setAttribute('id', convertBooks[i].ID)
    bookContainer.setAttribute('class', 'books')


    let changePage = convertBooks[i]['Goodreads_url']
      displayBook.addEventListener('click', ()=> {
        console.log('you just click on title')
        console.log(window.location.href)
        console.log(changePage)
        if(changePage === undefined){
          console.log('FUCK YOU')
        }else{
          window.open(`https://www.goodreads.com/book/show/${changePage}`, "_blank")
          // window.location.href = `https://www.goodreads.com/book/show/${}`
        }
      })
          // for(let key in convertBooks[i]){
      //   // console.log(key)
      //   // console.log(convertBooks[i][key])
      //   // console.log('testing: ', convertBooks[i]['Title'])
      //   // console.log(key.title)
      //   // console.log(key['ISBN'])
        
      // }
  }
}

ISBN.addEventListener("click", getBookInfo);

let testISBN = document.querySelector("#typeISBN");
testISBN.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("HELLO");
    console.log(testISBN.value)
    let passISBN = testISBN.value
    fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${passISBN}&jscmd=data&format=json`
    )
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data[`ISBN:${[passISBN]}`]);
        let bookData = data[`ISBN:${[passISBN]}`]
        console.log(bookData.by_statement)
        // console.log()
        // bookData.subtitle !== ''
        // let displayBook = document.createElement('p');
        let haveBook = JSON.parse(localStorage.getItem('Books'))
        if(localStorage.getItem('Books')){
          for(let i = 0; i <= haveBook.length - 1; i++){
            if(passISBN === haveBook[i]['ISBN']){
                return alert('the book is already in memory')

            }
          }
      }

        console.log('IT DIDNT WORK')
        let displayBook = document.createElement('p');
        let goodreadsNum= bookData.identifiers
        let changeURL;
        if(goodreadsNum.hasOwnProperty('goodreads')){
          console.log('has THE property')
          changeURL = bookData.identifiers.goodreads[0]
        }
        console.log(changeURL)

        // if(bookData.hasOwnProperty('by_statement')){
        //   console.log('IT DOES HAVE IT')
        // }
        let author = bookData.hasOwnProperty('by_statement')? bookData.by_statement 
        : bookData.authors[0].name
        let titleNAuthor = `${bookData.title} by ${author}`
        displayBook.innerText = titleNAuthor

        

        let titleNAuthorObj = [
          { 
            Title: bookData.title, 
            Author:author,
            ISBN: passISBN,
            Goodreads_url: changeURL
          }]

        if(bookData.hasOwnProperty('subtitle')){
          titleNAuthor = `${bookData.title}: ${bookData.subtitle} by ${author}`;
          displayBook.innerText = titleNAuthor
          titleNAuthorObj[0].Title = bookData.title + ': ' + bookData.subtitle; 
        }


        // displayBook.style.fontWeight = 'bold'; 
        bookmarks.append(displayBook); 

        
        // localstorage
        if(!localStorage.getItem('Books')){
          localStorage.setItem('Books', JSON.stringify(titleNAuthorObj))
        }else{
          let convertItem = JSON.parse(localStorage.getItem('Books'))
          convertItem.push(titleNAuthorObj[0])
          localStorage.setItem('Books', JSON.stringify(convertItem))
        }
        // let convertBooks = JSON.parse(localStorage.getItem('Books'));
        let changePage = changeURL
        displayBook.addEventListener('click', ()=> {
          console.log('you just click on title')
          console.log(window.location.href)
          console.log(changePage)
          if(changePage === undefined){
            console.log('FUCK YOU')
          }else{
            window.open(`https://www.goodreads.com/book/show/${changePage}`, "_blank")
            // window.location.href = `https://www.goodreads.com/book/show/${}`
          }
        })

      });
  }
});



function getBookInfo() {
  let displayISBN = document.querySelector("#typeISBN");
  // console.log("HELLO");
  // console.log(testISBN.value)
  let passISBN = displayISBN.value
  fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${passISBN}&jscmd=data&format=json`
  )
    .then((res) => {
      // console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      //why you have to use and square bracket notion instead of curly braclets 
      console.log(data[`ISBN:${passISBN.authors}`]);
      // looks like the item needs to be stored in a varible before playing around
      //with it

      // console.log(data.authors[0].name)
      console.log(data[`ISBN:${[passISBN]}`]);
      let bookData = data[`ISBN:${[passISBN]}`]
      // console.log(bookData.by_statement)
      // console.log(bookData.authors[0].name)
      let grabFirstChar = bookData.authors[0].name[0]
      console.log(grabFirstChar)
      // (bookData.authors[0].name).replaceAll(grabFirstChar, grabFirstChar.toLowerCase())
      // let nameID = (bookData.authors[0].name).replaceAll(' ', '')
      nameID = (bookData.authors[0].name).replaceAll(grabFirstChar, grabFirstChar.toLowerCase())
      let lowerCaseName = nameID.replaceAll(' ', '')
      //0934868255
      console.log(lowerCaseName)
      // console.log(nameID[0].toLowerCase())
      // console.log()
      // bookData.subtitle !== ''
      // let displayBook = document.createElement('p');
      let haveBook = JSON.parse(localStorage.getItem('Books'))
      if(localStorage.getItem('Books')){
        for(let i = 0; i <= haveBook.length - 1; i++){
          if(passISBN === haveBook[i]['ISBN']){
              return alert('the book is already in memory')

          }
        }
    }

      console.log('IT DIDNT WORK')
      let displayBook = document.createElement('p');
      let goodreadsNum= bookData.identifiers
      let changeURL;
      if(goodreadsNum.hasOwnProperty('goodreads')){
        console.log('has THE property')
        changeURL = bookData.identifiers.goodreads[0]
      }
      console.log(changeURL)

      // if(bookData.hasOwnProperty('by_statement')){
      //   console.log('IT DOES HAVE IT')
      // }
      let author = bookData.hasOwnProperty('by_statement')? bookData.by_statement 
      : bookData.authors[0].name
      console.log('author ', author)
      console.log('name ', bookData.by_statement)
      let titleNAuthor = `${bookData.title} by ${author}`
      displayBook.innerText = titleNAuthor

      

      let titleNAuthorObj = [
        { 
          ID: lowerCaseName,
          Title: bookData.title, 
          Author:author,
          ISBN: passISBN,
          Goodreads_url: changeURL
        }]
    
      if(bookData.hasOwnProperty('subtitle')){
        titleNAuthor = `${bookData.title}: ${bookData.subtitle} by ${author}`;
        displayBook.innerText = titleNAuthor
        titleNAuthorObj[0].Title = bookData.title + ': ' + bookData.subtitle; 
      }
      // displayBook.style.fontWeight = 'bold'; 
      

      // localstorage

      let bookContainer = document.createElement('div')
      bookContainer.append(displayBook)

      bookmarks.append(bookContainer); 

      let getNewIDNumber = JSON.parse(localStorage.getItem('Books'))
      // console.log('Get the length ', getNewIDNumber.length)
      if(!localStorage.getItem('Books')){
        titleNAuthorObj = [
          { 
            ID: `${lowerCaseName}${0}`,
            Title: bookData.title, 
            Author:author,
            ISBN: passISBN,
            Goodreads_url: changeURL
          }]
        localStorage.setItem('Books', JSON.stringify(titleNAuthorObj))
        getNewIDNumber = JSON.parse(localStorage.getItem('Books'));
        // for(let i = 0; i <= getNewIDNumber.length; i++){
        // }
        bookContainer.setAttribute('id',`${lowerCaseName}${0}`)
        bookContainer.setAttribute('class', 'books')
        console.log('Get the length ', getNewIDNumber.length)
      }else{
        // debugger
        /* There is an issue on the for loop when I just fo i < converItem.length */
        let convertItem = JSON.parse(localStorage.getItem('Books'))
        // titleNAuthorObj = [
        //   { 
        //     ID: lowerCaseName,
        //     Title: bookData.title, 
        //     Author:author,
        //     ISBN: passISBN,
        //     Goodreads_url: changeURL
        //   }]



        convertItem.push(titleNAuthorObj[0])
        console.log(convertItem)
        console.log(convertItem[0].ID)
        console.log(convertItem[1].ID)
        // localStorage.setItem('Books', JSON.stringify(convertItem))

        for(let i = 0; i < convertItem.length; i++){
          // bookContainer.setAttribute('id',`${lowerCaseName}${i}`)
          // bookContainer.setAttribute('class', 'books')
          console.log(convertItem[i].ID.length)
          let getWord = convertItem[i].ID
          // console.log(getWord[]) 
          console.log(convertItem[i].ID)
          console.log(Number(convertItem[i].ID[convertItem[i].ID.length - 1]))
          let isItNum = Number(convertItem[i].ID[convertItem[i].ID.length - 1])

          if(!isNaN(Number(convertItem[i].ID[convertItem[i].ID.length - 1]))){
            bookContainer.setAttribute('id',`${convertItem[i].ID}`)
            console.log('no Change')
          }else{
            convertItem[i].ID = `${lowerCaseName}${i}`
            bookContainer.setAttribute('id',`${lowerCaseName}${i}`)
          }
          
          bookContainer.setAttribute('class', 'books')
          // convertItem[i].ID = `${lowerCaseName}${i}`
          // console.log(titleNAuthorObj.ID)
        }
        localStorage.setItem('Books', JSON.stringify(convertItem))

        

        // for(let i = convertItem.length; i <= 0; i--){
        //   bookContainer.setAttribute('id',`${lowerCaseName}${i}`)
        // }
        
      }
      // let convertBooks = JSON.parse(localStorage.getItem('Books'));




    /* This a sub-function that would direct the user to a different page
    if the clicked item's API has a description on the book from a different link  */
      let changePage = changeURL
      displayBook.addEventListener('click', ()=> {
        console.log('you just click on title')
        console.log(window.location.href)
        console.log(changePage)
        if(changePage === undefined){
          console.log('FUCK YOU')
        }else{
          window.open(`https://www.goodreads.com/book/show/${changePage}`, "_blank")
          // window.location.href = `https://www.goodreads.com/book/show/${}`
        }
      })
      console.log('change id name ', titleNAuthorObj[0].ID)
      console.log(titleNAuthorObj)

    });



  // let displayISBN = document.querySelector("#typeISBN").value;

  // if (displayISBN.includes("-")) {
  //   displayISBN = displayISBN.replace("-", "");
  // }
  // // console.log(typeof displayISBN)
  // // console.log(displayISBN)

  // // `https://openlibrary.org/isbn/${displayISBN}.json`

  // fetch(`https://openlibrary.org/isbn/${displayISBN}.json`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data.data);
  //     console.log(data);
  //     console.log(data.url);
  //     let testing = data;
  //     let addBook;
  //     // console.log(testing)
  //     // console.log(typeof testing)
  //     // console.log(data.title, data.subtitle)
  //     let bookmarks = document.querySelector("#bookmarks");
  //     let title = document.createElement("p");
  //     let titleOfBook = data.title;
  //     if (testing.hasOwnProperty("subtitle")) {
  //       titleOfBook = data.title + ": " + data.subtitle;
  //     }
  //     title.innerText = titleOfBook;
  //     bookmarks.append(title);

  //     if (!localStorage.getItem("title")) {
  //       localStorage.setItem("Books", titleOfBook);
  //       console.log("added first book");
  //     } else {
  //       addBook = JSON.stringify(localStorage.getItem("title"))
  //         .replaceAll('"', "")
  //         .split();
  //       addBook.push(" " + titleOfBook);
  //       localStorage.setItem("Books", addBook);
  //       console.log("added another book");
  //     }
  //     console.log(addBook);
  //   });
}

let removeAllBtn = document.querySelector('#removeAll')
removeAllBtn.addEventListener('click', (e)=> {
  let confirmAction = confirm('Are you sure you want to delete all bookmarks?')
  if(confirmAction === true){
    localStorage.clear()
    console.log('it works')
    // bookmarks.remove
    while (bookmarks.firstChild) {
      bookmarks.removeChild(bookmarks.firstChild);
    }
  }
  console.log(e)
  console.log('testing')

})

