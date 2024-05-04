import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import Service from "../../src/stub-concept/service.js";
import fs from "node:fs/promises";
import fsSync from "node:fs";

describe("Service Test Suite", () => {
  let _service;
  const filename = "testfile.ndjson";
  beforeEach(() => {
    _service = new Service({ filename });
  });

  describe("read", () => {
    it("should throw error if file does not exist", async () => {
      jest.spyOn(fsSync, "existsSync").mockReturnValue(false);
      await expect(_service.read()).rejects.toThrow("File does not exist");
    });

    it("should return an empty array if the file is empty", async () => {
      jest.spyOn(fsSync, "existsSync").mockReturnValue(true);
      jest.spyOn(fs, "readFile").mockResolvedValue("");
      const result = await _service.read();
      expect(result).toEqual([]);
    });

    it("should return users without password if file contains users", async () => {
      const dbData = [
        {
          username: "username1",
          password: "password1",
          createdAt: new Date().toISOString(),
        },
        {
          username: "username2",
          password: "password2",
          createdAt: new Date().toISOString(),
        },
      ];
      const fileContents = dbData
        .map((item) => JSON.stringify(item).concat("\n"))
        .join("");
      jest.spyOn(fsSync, "existsSync").mockReturnValue(true);
      jest.spyOn(fs, "readFile").mockResolvedValue(fileContents);
      const result = await _service.read();
      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }));
      expect(result).toEqual(expected);
    });
  });
});
