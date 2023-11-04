import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { addTodo } from "../API/API";

export const CreateTodo: React.FC<{ setShow: any }> = ({ setShow }) => {
  const [dateRange, setDateRange]: any = useState([null, null]);
  const [startDate, endDate]: any = dateRange;
  const [task, setTask] = useState<string>("");

  return (
    <>
      <Container>
        <Box>
          <TextArea
            placeholder="Enter your task here"
            value={task}
            onChange={(e: any) => {
              setTask(e.target.value);
            }}
          ></TextArea>
          <Time
            placeholderText="Enter you task date deadline"
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null] | any) => {
              setDateRange(update);
            }}
            isClearable={true}
          />
          <AddTask
            onClick={() => {
              let difference =
                Date.parse(dateRange[1]) - Date.parse(dateRange[0]);
              const data = {
                task,
                time: Date.parse(`${endDate}`),
              };

              setShow(false);

              addTodo(data);
            }}
          >
            Add task
          </AddTask>
        </Box>
      </Container>
    </>
  );
};

const AddTask = styled.div`
  padding: 10px 20px;
  color: silver;
  font-size: 15px;
  border-radius: 15px;
  background-color: black;
  cursor: pointer;
`;

const Time = styled(DatePicker)`
  margin: 15px 0;
  height: 50px;
  padding: 0 50px;
  border: 1px solid silver;
  border-radius: 30px;
  outline: none;

  &::placeholder {
    font-family: Poppins;
    font-size: 10px;
  }
`;

const TextArea = styled.textarea`
  width: 90%;
  height: 240px;
  outline: none;
  border: none;
  border-radius: 30px;
  padding: 30px 10px;
`;

const Box = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  border: 1px solid silver;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(250, 250, 250, 0.5);
  backdrop-filter: blur(5px);
  z-index: 3;
`;
