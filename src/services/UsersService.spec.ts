import {PlatformTest} from "@tsed/common";
import {UsersService} from "./UsersService";

describe("UsersService", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it(
    "should do something",
    PlatformTest.inject([UsersService], (service: UsersService) => {
      expect(service).toBeInstanceOf(UsersService);
    })
  );
});
