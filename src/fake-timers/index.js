import Task from "./task.js";

const oneSecond = 1000;
const runIsOneSecond = new Date(Date.now() + oneSecond);
const runIsTwoSeconds = new Date(Date.now() + oneSecond * 2);
const runIsThreeSeconds = new Date(Date.now() + oneSecond * 3);

const task = new Task();
task.save({
  name: "task1",
  dueAt: runIsOneSecond,
  fn: () => console.log("task1 executed"),
});
task.save({
  name: "task2",
  dueAt: runIsTwoSeconds,
  fn: () => console.log("task2 executed"),
});
task.save({
  name: "task3",
  dueAt: runIsThreeSeconds,
  fn: () => console.log("task3 executed"),
});

task.run(oneSecond);
