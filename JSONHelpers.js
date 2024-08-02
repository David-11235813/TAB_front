export default class JSONHelpers {
  static parse(key, value) {
    if (value != null && typeof value == "object") {
      if (value.type === "Map") {
        return new Map(Object.entries(value.value));
      } else if (value.type === "Date") {
        return new Date(value.value);
      }
    }
    return value;
  }

  static stringify(key, value) {
    if (value instanceof Map) {
      return {
        type: "Map",
        value: Object.fromEntries(value)
      };
    } else if (this[key] instanceof Date) {
      return {
        value: this[key].toUTCString(),
        type: "Date"
      };
    }

    return value;
  }
}
