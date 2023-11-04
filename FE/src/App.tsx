import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BsPinAngle, BsPlus, BsX } from "react-icons/bs";
import { FcCheckmark } from "react-icons/fc";
import { deleteTask, getTodos, updateTask } from "../API/API";
import moment from "moment";
import { CreateTodo } from "./CreateTodo";
function App() {
  const [state, setState]: Array<any> = useState<Array<{}>>([]);
  const [show, setShow] = useState(false);

  useMemo(() => {
    getTodos().then((res: any) => {
      setState(res);
    });
  }, [state]);

  return (
    <>
      <Container>
        <CardHolder>
          <Info>START</Info>

          {state &&
            state
              .filter((el: any) => el.done === "start")
              .map((el: any) => (
                <Card key={el._id}>
                  <Icon />

                  <Task>{el.task}</Task>

                  <Time>
                    <Txt>
                      Created at:{" "}
                      {moment(Date.parse(el.createdAt)).format("LLLL")}
                    </Txt>
                    <Txt>Ends at: {el.deadline}</Txt>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        onClick={() => {
                          updateTask(el._id);
                        }}
                      >
                        Start task
                      </Button>
                      <Button
                        onClick={() => {
                          deleteTask(el._id);
                        }}
                      >
                        Delete task
                      </Button>
                    </div>
                  </Time>
                </Card>
              ))}
        </CardHolder>
        <CardHolder>
          <Info>ONGOING</Info>

          {state &&
            state
              ?.filter((el: any) => el.done === "ongoing")
              .map((el: any) => (
                <Card key={el._id}>
                  <Icon />

                  <Task>{el.task}</Task>

                  <Time>
                    <Txt>
                      Created at:{" "}
                      {moment(Date.parse(el.createdAt)).format("LLLL")}
                    </Txt>
                    <Txt>Ends at: {el.deadline}</Txt>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        onClick={() => {
                          updateTask(el._id);
                        }}
                      >
                        Finish task
                      </Button>
                      <Button
                        onClick={() => {
                          deleteTask(el._id);
                        }}
                      >
                        Delete task
                      </Button>
                    </div>
                  </Time>
                </Card>
              ))}
        </CardHolder>

        <CardHolder>
          <Info>DONE</Info>

          {state &&
            state
              ?.filter((el: any) => el.done === "finished")
              .map((el: any) => (
                <Card key={el._id}>
                  <FcCheckmark />
                  <Task>{el.task}</Task>

                  <Time>
                    <Txt>
                      Created at:{" "}
                      {moment(Date.parse(el.createdAt)).format("LLLL")}
                    </Txt>
                    <Txt>Ended at: {el.deadline}</Txt>
                    <div style={{ display: "flex", gap: "10px" }}></div>
                  </Time>
                </Card>
              ))}
        </CardHolder>

        {show ? (
          <Add
            onClick={() => {
              setShow(!show);
            }}
          >
            <BsX size={33} />
          </Add>
        ) : (
          <Add
            onClick={() => {
              setShow(!show);
            }}
          >
            <BsPlus size={33} />
          </Add>
        )}
      </Container>
      {show ? <CreateTodo setShow={setShow} /> : ""}
    </>
  );
}
export default App;

const Add = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  color: white;
  font-weight: 600;
  background-color: black;
  transition: all 350ms;

  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 5;

  &:hover {
    background-color: darkgrey;
    cursor: pointer;
  }
`;

const Icon = styled(BsPinAngle)``;

const Txt = styled.div`
  font-size: 14px;
  margin: 6px 0 0 0;
`;

const Time = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`;

const Button = styled.div`
  width: 33%;
  background-color: black;
  color: white;
  padding: 10px 0;
  margin: 20px 0 0 0;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 29px;
  font-size: 13px;
`;

const Task = styled.div`
  width: 100%;
`;

const Card = styled.div`
  width: 80%;
  border: 1px solid silver;
  padding: 15px 3%;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  font-size: 30px;
`;

const CardHolder = styled.div`
  width: 400px;
  border: 1px solid silver;
  max-height: 80vh;
  overflow-y: auto;
  border-radius: 20px 0 20px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  padding-bottom: 30px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 40px 0;
`;
