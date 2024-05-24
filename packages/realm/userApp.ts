import * as Realm from "realm-web";

const UserApp = new Realm.App({ id: "userpanelrealtime-mwxuyzl" });

const credentials = Realm.Credentials.anonymous();

async function getUser(): Promise<Realm.User> {
  const user = await UserApp.logIn(credentials);
  return user;
}

export { UserApp, getUser };
