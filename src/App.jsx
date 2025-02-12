import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <Header />
      <main>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </main>
    </>
  );
}

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // 1초마다 현재 시간 업데이트
    }, 1000);
  });

  const time = currentTime.toLocaleString(); //현재 시간을 문자열로 변한

  return (
    <header>
      <h2> 💡 오늘의 할 일</h2>
      <p>🗓️ {time}</p>
    </header>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="input-field">
        {" "}
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          onClick={() => {
            const newTodo = { id: Number(new Date()), content: inputValue };
            const newTodoList = [...todoList, newTodo];
            setTodoList(newTodoList);
            setInputValue("");
          }}
        >
          추가하기
        </button>
      </div>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function UpdateTodo({ todo, setTodoList }) {
  // 수정 중인지 체크하는 상태 변경 함수 - 기본값 false
  const [isEditing, setIsEditing] = useState(false);
  // 수정된 입렵 값을 바꾸는 상태 변경 함수
  const [inputValue, setInputValue] = useState("");

  const handleEdit = () => {
    if (isEditing && inputValue.trim() !== "") {
      //입력 값이 존재할 경우 리스트 업데이트
      setTodoList((prev) =>
        prev.map((el) =>
          el.id === todo.id ? { ...el, content: inputValue } : el
        )
      );
      setIsEditing(false); // 수정 모드 종료
    } else {
      //수정모드 시작
      setIsEditing(true);
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={todo.content} // 기존 텍스트를 placeholder로 표시
        />
      ) : (
        <span className="content"> {todo.content} </span>
      )}
      <button onClick={handleEdit}>{isEditing ? "수정 완료" : "수정"}</button>
    </>
  );
}

function DeleteTodo({ todo, setTodoList }) {
  return (
    <button
      onClick={() => {
        setTodoList((prev) => {
          return prev.filter((el) => el.id !== todo.id);
        });
      }}
    >
      삭제
    </button>
  );
}

function Todo({ todo, setTodoList }) {
  // 완료 상태를 체그하는 상태 변경 함수 - 기본값 false
  const [isComplete, setIsComplete] = useState(false);

  const checkComplete = () => {
    setIsComplete((prev) => !prev); // 클릭할 때마다 상태 변경
  };
  return (
    <li>
      <span onClick={checkComplete} className="toggle">{isComplete ? "☑️" : "⬜️"}</span>
      <UpdateTodo todo={todo} setTodoList={setTodoList} />
      <DeleteTodo todo={todo} setTodoList={setTodoList} />
    </li>
  );
}

export default App;
