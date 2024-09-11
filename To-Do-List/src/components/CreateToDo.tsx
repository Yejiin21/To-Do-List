import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atom";
import styled from "styled-components";

const Input = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;

  input {
    width: 300px;
    height: 15px;
    padding: 10px;
    font-size: 16px;
    margin-right: 10px;
    border-radius: 10px;
  }
`;

const AddBtn = styled.button`
  width: 50px;
  height: 35px;
  border-radius: 20px;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Input onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <AddBtn>Add</AddBtn>
    </Input>
  );
}

export default CreateToDo;
