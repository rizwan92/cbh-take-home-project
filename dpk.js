const crypto = require("crypto");
const constants = require("./utils/constants.js");

const { MAX_PARTITION_KEY_LENGTH, TRIVIAL_PARTITION_KEY, CRYPTO_ALGORITHM } =
  constants;

/**
 *
 * @param {string} inputString
 * @returns {string}
 * @description Returns a SHA3-512 hash
 * of the input string.
 *
 */
const createHash = (inputString) => {
  return crypto
    .createHash(CRYPTO_ALGORITHM)
    .update(inputString.toString())
    .digest("hex");
};

/**
 *
 * @param {string} event
 * @returns {string}
 * @description Returns a deterministic partition key for a given event.
 * If the event has a partitionKey property, it will be used.
 * If the event is a string, it will be used.
 * If the event is an object, it will be stringified and used.
 * If the event is falsy, the trivial partition key will be used.
 * If the event is a string and longer than 256 characters, it will be hashed.
 * If the event is an object and stringified longer than 256 characters, it will be hashed.
 */
const deterministicPartitionKey = (event) => {
  let candidate; // declaring a variable without initializing it

  if (event) {
    // checking if event is truthy or falsy
    const { partitionKey } = event; // destructuring the partitionKey property from the event object
    candidate = partitionKey
      ? partitionKey.toString()
      : createHash(JSON.stringify(event)); // ternary operator to check if partitionKey is truthy or falsy and assign it to candidate variable
  }

  candidate = candidate || TRIVIAL_PARTITION_KEY; // checking if candidate is truthy or falsy and assigning it to candidate variable

  if (candidate?.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};

module.exports = {
  deterministicPartitionKey,
  createHash,
};
