import React, { useContext } from "react";
import {AppContext} from "../store.js";

// 显示列表
function List(props) {
  const {
    books: {list}
    // delAction
  } = useContext(AppContext);
  
  console.log('list -> ', list)
  return (
    <div>
      <h1>books列表数据</h1>
      <ul>
        {list.map(book => (
          <li key={book.id}>
            {book.name}
            {/*<span onClick={() => delAction(book.id)}>【删除】</span>*/}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
