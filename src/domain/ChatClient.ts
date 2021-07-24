export class ChatClient {
  /**
   *
   */
  public name: string;

  constructor(private _id: string) {}

  /**
   *
   * @returns {string}
   */
  get id(): string {
    return this._id;
  }

  /**
   *
   */
  public toJSON = () => ({
    userId: this._id,
    name: this.name
  });
}
