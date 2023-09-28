



export class CustomerService {

    docDataById;
    docId;
    chatId;
    keywordId;


  


  getTable() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.tableData);
  }

  //select Reviewer
  getCountries() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.data1);
  }
  getSections() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.user);
    // return axios.get('http://localhost:3000/Sections')
  }
  getProductsSmall() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
  // //User management
  //      getallUser() {
  //     return fetch('data/db.json').then(res => res.json())
  //             .then(d => d.userManagement);
  // }

  //Add New User
  getRole() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  //Sorting
  getProducts() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.data3);
  }

  //Main Table
  getAllDocument() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.data2);
  }
  //http://192.168.1.59:8080/sample/getAllDoc

  //search
  getDocumentSearch() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.search);
  }

  getDocument() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.data2);
  }

  // getCustomersLarge() {
  //     return fetch('data/db.json').then(res => res.json())
  //             .then(d => d.data7);
  // }

  //Documents
  // getDocument() {
  //     return fetch('data/db.json').then(res => res.json())
  //             .then(d => d.document);
  // }

  getAllSections() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.allsections);
  }

  //User Table
  getAllUser() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.userRole);
  }

  //get Audit History

  getAuditHistory() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.auditHistory);
  }

  //Bookmark
  getBookmarkDoc() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.bookmark);
  }

  getCustomersMedium() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.table);
  }

  //view
  getDataView() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.view);
  }


  //chats

  getAllChats() {
    return fetch("data/db.json")
      .then((res) => res.json())
      .then((d) => d.allChats);
  }



  getTreeTableNodes() {
    return fetch("data/db.json").then(res => res.json())
            .then(d => d.root);
}

// getTreeNodes() {
//     return fetch("data/db.json").then(res => res.json())
//             .then(d => d.root);
// }
}


