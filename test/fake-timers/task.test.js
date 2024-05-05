import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import Task from "../../src/fake-timers/task.js";
import { setTimeout } from "node:timers/promises";

describe("Task Test Suite", () => {
  let _task;
  let _logMock;

  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation();
    _task = new Task();
  });

  afterEach(() => {
    _logMock.mockRestore();
  });

  it.skip("should only run tasks that are due without fake timers (slow)", async () => {
    const tasks = [
      {
        name: "Task-Will-Run-In-5-Seconds",
        dueAt: new Date(Date.now() + 5000), // 5s
        fn: jest.fn(),
      },
      {
        name: "Task-Will-Run-In-10-Seconds",
        dueAt: new Date(Date.now() + 10000), // 10s
        fn: jest.fn(),
      },
    ];

    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    await setTimeout(11000); // 11s

    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  }, 15000);

  it("should only run tasks that are due with fake timers (fast)", async () => {
    jest.useFakeTimers();

    const tasks = [
      {
        name: "Task-Will-Run-In-5-Seconds",
        dueAt: new Date(Date.now() + 5000), // 5s
        fn: jest.fn(),
      },
      {
        name: "Task-Will-Run-In-10-Seconds",
        dueAt: new Date(Date.now() + 10000), // 10s
        fn: jest.fn(),
      },
    ];

    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    jest.advanceTimersByTime(4000); // 4s
    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000); // 2s
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(4000); // 4s
    expect(tasks.at(1).fn).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it("run method should stop when all tasks are finished", async () => {
    jest.useFakeTimers();
    _task.run(100);
    jest.advanceTimersByTime(1000); // 1s
    expect(console.log).toHaveBeenCalledWith("tasks finished!");
  });
});
