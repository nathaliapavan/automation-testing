class Person {
  static validate(person) {
    if (!person.name) throw new Error("name is required");
    if (!person.cpf) throw new Error("cpf is required");
  }

  static format(person) {
    const [firstName, ...lastName] = person.name.split(" ");
    return {
      cpf: person.cpf.replace(/\D/g, ""),
      firstName,
      lastName: lastName.join(" "),
    };
  }

  static save(person) {
    if (!["cpf", "firstName", "lastName"].every((prop) => person[prop])) {
      throw new Error(`Cannot save invalid person: ${JSON.stringify(person)}`);
    }
    console.log("Record saved successfully!");
  }

  static process(person) {
    this.validate(person);
    const formattedPerson = this.format(person);
    this.save(formattedPerson);
    console.log(person);
    return "ok";
  }
}

// Person.process({ name: "Nat", cpf: "123.456.789-00" });
// Person.process({ cpf: "123.456.789-00" });

export default Person;
