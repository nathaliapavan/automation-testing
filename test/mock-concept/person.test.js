import { describe, it, expect, jest } from "@jest/globals";
import Person from "../../src/mock-concept/person";

describe("Person Suite", () => {
  describe("validate", () => {
    it("should throw an error if the name is not present", () => {
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw an error if the cpf is not present", () => {
      const mockInvalidPerson = {
        name: "nat",
        cpf: "",
      };
      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not throw an error person is valid", () => {
      const mockValidPerson = {
        name: "nat",
        cpf: "123.456.789-00",
      };
      expect(() => Person.validate(mockValidPerson)).not.toThrow();
    });
  });

  describe("format", () => {
    it("should format the person name and CPF", () => {
      const mockPerson = {
        name: "Nat Pavan",
        cpf: "000.000.123-45",
      };
      const formattedPerson = Person.format(mockPerson);
      const expected = {
        firstName: "Nat",
        lastName: "Pavan",
        cpf: "00000012345",
      };
      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe("save", () => {
    it("should throw an error if the cpf is not present", () => {
      const mockInvalidFormattedPerson = {
        firstName: "Nat",
        lastName: "Pavan",
        cpf: "",
      };
      expect(() => Person.save(mockInvalidFormattedPerson)).toThrow(
        new Error(
          `Cannot save invalid person: ${JSON.stringify(
            mockInvalidFormattedPerson
          )}`
        )
      );
    });

    it("should throw an error if the firstName is not present", () => {
      const mockInvalidFormattedPerson = {
        firstName: "",
        lastName: "Pavan",
        cpf: "12345678900",
      };
      expect(() => Person.save(mockInvalidFormattedPerson)).toThrow(
        new Error(
          `Cannot save invalid person: ${JSON.stringify(
            mockInvalidFormattedPerson
          )}`
        )
      );
    });

    it("should throw an error if the lastName is not present", () => {
      const mockInvalidFormattedPerson = {
        firstName: "Nat",
        lastName: "",
        cpf: "12345678900",
      };
      expect(() => Person.save(mockInvalidFormattedPerson)).toThrow(
        new Error(
          `Cannot save invalid person: ${JSON.stringify(
            mockInvalidFormattedPerson
          )}`
        )
      );
    });

    it("should not throw an error if the person is formatted correctly", () => {
      const mockInvalidFormattedPerson = {
        firstName: "Nat",
        lastName: "Pavan",
        cpf: "12345678900",
      };
      expect(() => Person.save(mockInvalidFormattedPerson)).not.toThrow();
    });
  });

  describe("process", () => {
    it("should not throw an error if the person is formatted correctly", () => {
      const mockValidPerson = {
        name: "Nat Pavan",
        cpf: "123.456.789-00",
      };
      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        cpf: "12345678900",
        firstName: "Nat",
        lastName: "Pavan",
      });
      expect(Person.process(mockValidPerson)).toStrictEqual("ok");
    });
  });
});
