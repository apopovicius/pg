import { calledWith, logTiming, timing, logAccess, format, getFormat } from "./perfDecorators";

const delay = <T>(time: number, data: T): Promise<T> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(data);
    }, time)
  );

@logTiming
class Users {
  @format("Hello, %s")
  greeting: string;

  constructor() {
    this.greeting = "World";
  }

  @timing()
  async getUsers() {
    return await delay(1000, []);
  }

  @timing()
  async getUser(@calledWith id: number) {
    return await delay(50, {
      id: `user:${id}`,
    });
  }

  @logAccess
  get greet() {
    const formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }

  set greet(value: string) {
    this.greeting = value;
  }
}

(async function () {
  const users = new Users();

  const user = await users.getUser(22);
  console.log(`Got ${JSON.stringify(user)}`);

  await users.getUser(42);

  await users.getUsers();

  console.log(users.greet);
  users.greet = "Universe";
  console.log(users.greet);

  // @ts-ignore
  users?.printTimings();
})();