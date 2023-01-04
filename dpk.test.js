const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

// write test function for the createHash function
describe("createHash", () => {
  it("Returns a SHA3-512 hash of the input string", () => {
    const hash = createHash("hello world");
    expect(hash).toBe("d8e8fca2dc0f896fd7cb4cb0031ba249");
  });
});
