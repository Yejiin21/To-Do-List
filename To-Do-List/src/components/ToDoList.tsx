import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector } from "./atom";
import ToDo from "./ToDo";
import styled from "styled-components";

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#4caf50" : "#f0f0f0")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => (props.isActive ? "#45a049" : "#e0e0e0")};
  }
`;

function ToDoList() {
  //hook 호출
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onClickCategory = (newCategory: Categories) => {
    setCategory(newCategory);
  };
  console.log(toDos);
  return (
    <div>
      {" "}
      {/* 모든 JSX 요소를 감싸는 부모 요소 */}
      <Title>To Dos</Title>
      <hr />
      <ButtonGroup>
        <Button
          isActive={category === Categories.TO_DO}
          onClick={() => onClickCategory(Categories.TO_DO)}
        >
          To Do
        </Button>
        <Button
          isActive={category === Categories.DOING}
          onClick={() => onClickCategory(Categories.DOING)}
        >
          Doing
        </Button>
        <Button
          isActive={category === Categories.DONE}
          onClick={() => onClickCategory(Categories.DONE)}
        >
          Done
        </Button>
      </ButtonGroup>
      <CreateToDo />
      {toDos?.map((toDo) => <ToDo key={toDo.id} {...toDo} />)}
    </div>
  );
}

export default ToDoList;
