import React, { useRef, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./config";

const App = () => {
  const [todo, settodo] = useState([]);
  const todoVal = useRef();

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "todoVal"));
      const todos = [];
      querySnapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() }); // Include document ID
      });
      settodo(todos);
    };

    getData();
  }, []);

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "todoVal", id)); // Delete from Firestore
      settodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Update local state
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  const Addtodo = async (event) => {
    event.preventDefault();
    const newTodoValue = todoVal.current.value;

    if (!newTodoValue) return;

    const newTodo = { todoValue: newTodoValue };

    try {
      const docRef = await addDoc(collection(db, "todoVal"), newTodo);
      console.log("Document written with ID: ", docRef.id);
      settodo((prevTodos) => [...prevTodos, { id: docRef.id, ...newTodo }]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    todoVal.current.value = "";
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold underline mt-11">
        Todo App
      </h1>

      <form onSubmit={Addtodo}>
        <div className="mb-6">
          <input
            type="text"
            id="large-input"
            placeholder="Enter Your Todos"
            ref={todoVal}
            className="block mt-6 w-[40%] mx-auto p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <div className="text-center">
            <button
              type="submit"
              className="mt-5  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Item
            </button>
          </div>
        </div>
      </form>

      <div className="container mx-auto w-[60%] relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Todo Items Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todo.length > 0 ? (
              todo.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.todoValue}
                  </th>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="btn btn-primary font-medium text-white dark:text-blue-500 hover:underline"
                    >
                      <svg
                        class="h-8 w-8 text-white-900"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />{" "}
                        <line x1="4" y1="7" x2="20" y2="7" />{" "}
                        <line x1="10" y1="11" x2="10" y2="17" />{" "}
                        <line x1="14" y1="11" x2="14" y2="17" />{" "}
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "}
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  <div class="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
