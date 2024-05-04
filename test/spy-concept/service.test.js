import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import Service from "../../src/stub-concept/service.js";
import crypto from "node:crypto";
import fs from "node:fs/promises";

describe("Service Test Suite", () => {
  let _service;
  const filename = "testfile.ndjson";
  const MOCK_HASH_PASS = "hash-pass";
  describe("create", () => {
    beforeEach(() => {
      jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
        update: jest.fn().mockReturnThis(),
        digest: jest.fn().mockReturnValue(MOCK_HASH_PASS),
      });

      jest.spyOn(fs, fs.appendFile.name).mockResolvedValue();
      _service = new Service({ filename });
    });

    it("should call appendFile with rigth params", async () => {
      const input = { username: "username1", password: "password1" };
      const expectedCreatedAt = new Date().toISOString();
      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockReturnValue(expectedCreatedAt);
      await _service.create(input);
      expect(crypto.createHash).toHaveBeenNthCalledWith(1, "sha256");

      const hash = crypto.createHash("sha256");
      expect(hash.update).toHaveBeenNthCalledWith(1, input.password);
      expect(hash.digest).toHaveBeenNthCalledWith(1, "hex");

      const expected = JSON.stringify({
        ...input,
        createdAt: expectedCreatedAt,
        password: MOCK_HASH_PASS,
      }).concat("\n");

      expect(fs.appendFile).toHaveBeenCalledTimes(1);
      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);
    });
  });
});
