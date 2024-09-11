import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atom";
import styled from "styled-components";

const ToDoContainer = styled.li`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ToDoText = styled.span`
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  width: 90%;
  margin-top: 10px;
  display: flex;
`;

const Button = styled.button`
  background-color: "#f0f0f0";
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  &:hover {
    background-color: "#45a049";
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDos = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDos,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const handleDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((toDo) => toDo.id !== id);
      return newToDos;
    });
  };
  return (
    <ToDoContainer>
      <ToDoText>{text}</ToDoText>
      <ButtonGroup>
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}
        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )}
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
    </ToDoContainer>
  );
}
export default ToDo;
